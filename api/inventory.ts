// Direct REST + JWT replacement for the previous googleapis-backed handler.
// Removes a 5+ MB SDK from the function bundle, drops cold start, and adds
// a 60s in-memory cache so warm invocations skip the full handshake.
//
// Required Vercel env vars:
//   GOOGLE_CLIENT_EMAIL
//   GOOGLE_PRIVATE_KEY  (newline-escaped is fine, we normalize it below)
//   GOOGLE_SHEET_ID
import { createSign } from 'node:crypto';

type SheetRow = string[];
type CacheEntry<T> = { value: T; expiresAt: number };

let inventoryCache: CacheEntry<unknown[]> | null = null;
let tokenCache: CacheEntry<string> | null = null;

const TOKEN_TTL_MS = 50 * 60 * 1000; // tokens are valid 60min, refresh at 50
const INVENTORY_TTL_MS = 60 * 1000; // 60 seconds is plenty for a sheet feed

const b64url = (input: Buffer | string): string =>
    Buffer.from(input)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
    const now = Date.now();
    if (tokenCache && tokenCache.expiresAt > now + 60_000) {
        return tokenCache.value;
    }

    const issuedAt = Math.floor(now / 1000);
    const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const claim = b64url(
        JSON.stringify({
            iss: clientEmail,
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
            aud: 'https://oauth2.googleapis.com/token',
            iat: issuedAt,
            exp: issuedAt + 3600,
        }),
    );
    const signingInput = `${header}.${claim}`;
    const signer = createSign('RSA-SHA256');
    signer.update(signingInput);
    signer.end();
    const signature = b64url(signer.sign(privateKey));
    const assertion = `${signingInput}.${signature}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion,
        }),
    });

    if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        throw new Error(`Google token exchange failed (${res.status}): ${errBody.slice(0, 200)}`);
    }

    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) {
        throw new Error('Google token response missing access_token');
    }

    const expiresInMs = (data.expires_in ?? 3600) * 1000;
    tokenCache = {
        value: data.access_token,
        expiresAt: now + Math.min(expiresInMs, TOKEN_TTL_MS),
    };
    return data.access_token;
}

async function fetchSheetRows(
    sheetId: string,
    accessToken: string,
): Promise<SheetRow[]> {
    const metaRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}?fields=sheets.properties.title`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!metaRes.ok) {
        const body = await metaRes.text().catch(() => '');
        throw new Error(`Sheets metadata failed (${metaRes.status}): ${body.slice(0, 200)}`);
    }
    const meta = (await metaRes.json()) as {
        sheets?: Array<{ properties?: { title?: string } }>;
    };
    let sheetName = meta.sheets?.[0]?.properties?.title || 'Sheet1';
    const inventorySheet = meta.sheets?.find(s => {
        const t = s.properties?.title?.toLowerCase();
        return t === 'inventory_feed' || t === 'inventory';
    });
    if (inventorySheet && inventorySheet.properties?.title) {
        sheetName = inventorySheet.properties.title;
    }

    const range = `${sheetName}!A1:Z2000`;
    const valuesRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(range)}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!valuesRes.ok) {
        const body = await valuesRes.text().catch(() => '');
        throw new Error(`Sheets values failed (${valuesRes.status}): ${body.slice(0, 200)}`);
    }
    const data = (await valuesRes.json()) as { values?: SheetRow[] };
    return data.values ?? [];
}

const normalizeHeader = (h: string) =>
    String(h ?? '')
        .trim()
        .toLowerCase()
        .replace(/ /g, '_');

function rowsToItems(rows: SheetRow[]): Record<string, unknown>[] {
    if (!rows || rows.length === 0) return [];

    let headerIndex = 0;
    for (let i = 0; i < Math.min(10, rows.length); i++) {
        const filledCols = rows[i].filter(cell => cell && cell.trim() !== '').length;
        if (filledCols >= 3) {
            headerIndex = i;
            break;
        }
    }

    const headers = rows[headerIndex].map(normalizeHeader);
    const valid = rows.slice(headerIndex + 1).filter((row) => {
        if (!row || row.length === 0) return false;
        const filledCount = row.filter((cell) => cell && cell.trim() !== '').length;
        return filledCount > 1; // Skips category rows like "TYM" which only have 1 filled cell
    });

    return valid.map((row, index) => {
        const item: Record<string, unknown> = { id: index + 1 };
        headers.forEach((header, i) => {
            const val = row[i] ?? '';
            const existing = item[header];
            if (typeof existing !== 'string' || (typeof val === 'string' && val.length > existing.length)) {
                item[header] = val;
            }

            if ((header === 'item_name' || header === 'name') && val) {
                const current = item.model;
                if (typeof current !== 'string' || val.length > current.length) {
                    item.model = val;
                }
            }
            if (header === 'category' && val) item.category = val;
            if ((header === 'make' || header === 'brand') && val) item.make = val;
            if (header === 'model' && val) {
                const current = item.model;
                if (typeof current !== 'string' || val.length > current.length) {
                    item.model = val;
                }
            }
            if ((header === 'price' || header === 'sale_price' || header === 'msrp') && val) {
                item.price = val;
            }
            if ((header === 'id' || header === 'item_id') && val) item.id = val;
        });
        return item;
    });
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');

    try {
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!clientEmail || !privateKeyRaw || !sheetId) {
            return res.status(500).json({
                error: 'Missing Google credentials. Set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in Vercel.',
            });
        }
        const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

        const now = Date.now();
        if (inventoryCache && inventoryCache.expiresAt > now) {
            return res.status(200).json(inventoryCache.value);
        }

        const accessToken = await getAccessToken(clientEmail, privateKey);
        const rows = await fetchSheetRows(sheetId, accessToken);
        const items = rowsToItems(rows);

        inventoryCache = {
            value: items,
            expiresAt: now + INVENTORY_TTL_MS,
        };

        return res.status(200).json(items);
    } catch (error: any) {
        console.error('Inventory API error:', error);
        return res.status(500).json({
            error: error?.message || 'Failed to fetch live inventory',
        });
    }
}
