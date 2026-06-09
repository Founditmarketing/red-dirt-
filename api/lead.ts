type LeadPayload = {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    source?: string;
    payload?: Record<string, unknown>;
};

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

    const target = process.env.LEAD_NOTIFY_EMAIL || 'reddirttractors@gmail.com';
    const webhook = process.env.LEAD_WEBHOOK_URL;

    const summary = {
        receivedAt: new Date().toISOString(),
        target,
        source: source || 'website',
        name: name || '',
        phone: phone || '',
        email: email || '',
        message: message || '',
        payload: body.payload || {},
    };

    try {
        if (webhook) {
            await fetch(webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(summary),
            });
        } else {
            console.log('[lead]', JSON.stringify(summary));
        }

        return res.status(200).json({ ok: true });
    } catch (error: any) {
        console.error('[lead] failed to forward', error);
        return res.status(502).json({ error: 'Failed to deliver lead. Please call 318-442-9010.' });
    }
}
