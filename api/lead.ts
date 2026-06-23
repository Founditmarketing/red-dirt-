import { Resend } from 'resend';

type LeadPayload = {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    source?: string;
    payload?: Record<string, unknown>;
};

const SOURCE_LABELS: Record<string, string> = {
    'equipment-quote': 'Equipment Quote Request',
    'trade-in': 'Trade-In Request',
    'find-my-tractor': 'Find My Tractor',
};

function buildEmailHtml(body: LeadPayload): string {
    const source = SOURCE_LABELS[body.source || ''] || (body.source || 'Website');
    const rows = [
        ['Form', source],
        ['Name', body.name || '—'],
        ['Phone', body.phone || '—'],
        ['Email', body.email || '—'],
        ['Message', body.message || '—'],
    ];

    if (body.payload && Object.keys(body.payload).length > 0) {
        for (const [k, v] of Object.entries(body.payload)) {
            rows.push([k, String(v)]);
        }
    }

    const tableRows = rows
        .map(
            ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee;">${label}</td>
        <td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${value}</td>
      </tr>`,
        )
        .join('');

    return `
<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;background:#f5f5f5;padding:32px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#c0392b;padding:20px 24px;">
      <h1 style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:1px;">New Lead — Red Dirt Tractors</h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">${source}</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${tableRows}
    </table>
    <p style="padding:16px 24px;font-size:12px;color:#999;margin:0;">
      Submitted via reddirt-tractors.com
    </p>
  </div>
</body>
</html>`;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let body: LeadPayload;
    try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    } catch {
        return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const { name, phone, email, message, source } = body;

    if (!name && !phone && !email) {
        return res.status(400).json({ error: 'Provide at least name, phone, or email.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('[lead] RESEND_API_KEY is not set');
        return res.status(500).json({ error: 'Email service not configured.' });
    }

    const resend = new Resend(apiKey);
    const sourceLabel = SOURCE_LABELS[source || ''] || (source || 'Website');
    const subject = `New Lead: ${sourceLabel}${name ? ` — ${name}` : ''}`;

    try {
        const { error } = await resend.emails.send({
            from: 'Red Dirt Tractors <hello@reddirttractors.com>',
            to: 'Reddirttractors@gmail.com',
            replyTo: email || undefined,
            subject,
            html: buildEmailHtml(body),
        });

        if (error) {
            console.error('[lead] resend error', error);
            return res.status(502).json({ error: 'Failed to send email. Please call 318-442-9010.' });
        }

        return res.status(200).json({ ok: true });
    } catch (err: any) {
        console.error('[lead] unexpected error', err);
        return res.status(502).json({ error: 'Failed to deliver lead. Please call 318-442-9010.' });
    }
}
