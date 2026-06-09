export type LeadInput = {
    source: string;
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    payload?: Record<string, unknown>;
};

export type LeadResult =
    | { ok: true }
    | { ok: false; error: string };

export async function submitLead(input: LeadInput): Promise<LeadResult> {
    try {
        const res = await fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            return {
                ok: false,
                error: data.error || `Server returned ${res.status}.`,
            };
        }

        return { ok: true };
    } catch (err: any) {
        return {
            ok: false,
            error: err?.message || 'Network error. Please call 318-442-9010.',
        };
    }
}
