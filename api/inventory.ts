import { google } from 'googleapis';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Force Dynamic: Disable Vercel aggressive Edge caching
    res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        const sheetId = process.env.GOOGLE_SHEET_ID;

        // If credentials are not set, return dummy data during local development? 
        // No, we should alert the user so they know they need to configure it locally if testing.
        if (!clientEmail || !privateKey || !sheetId) {
            return res.status(500).json({ error: 'Missing Google credentials in Vercel environment variables. Need GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID.' });
        }

        const auth = new google.auth.JWT(
            clientEmail,
            undefined,
            privateKey,
            ['https://www.googleapis.com/auth/spreadsheets.readonly']
        );

        const sheets = google.sheets({ version: 'v4', auth });
        
        // Retrieve the first sheet dynamically in case it's named something else
        const spreadsheet = await sheets.spreadsheets.get({
            spreadsheetId: sheetId,
        });
        
        const firstSheetName = spreadsheet.data.sheets?.[0]?.properties?.title || 'Sheet1';

        // Get all values from the first sheet up to 2000 rows
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `'${firstSheetName}'!A1:Z2000`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return res.status(200).json([]);
        }

        // Parse headers. Lowercase and replace spaces with camelCase or underscores.
        // E.g. "Item Name" -> "item_name", "Price" -> "price", "Status" -> "status"
        const headers = rows[0].map((h: string) => h.trim().toLowerCase().replace(/ /g, '_'));
        
        // Filter out completely empty rows
        const validRows = rows.slice(1).filter((row: any[]) => 
            row && row.length > 0 && row.some((cell: string) => cell && cell.trim() !== '')
        );
        
        const data = validRows.map((row: any[], index: number) => {
            const item: any = { id: index + 1 }; // Default numeric ID if missing
            
            headers.forEach((header: string, i: number) => {
                // To support both camelCase and standardized headers on frontend
                let val = row[i] || '';
                item[header] = val;
                
                // Also create generic camelCase alias for standard front-end mapping:
                if (header === 'item_name' || header === 'name') item.model = val;
                if (header === 'category') item.category = val;
                if (header === 'make' || header === 'brand') item.make = val;
                if (header === 'model') item.model = val;
                if (header === 'id' || header === 'item_id') item.id = val;
            });
            
            return item;
        });

        res.status(200).json(data);
    } catch (error: any) {
        console.error("Sheets API Error:", error);
        res.status(500).json({ error: error.message || 'Failed to fetch live inventory' });
    }
}
