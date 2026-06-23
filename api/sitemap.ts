const BASE = 'https://reddirttractors.com';

const STATIC_PAGES = [
    { path: '/',                    priority: '1.0', changefreq: 'weekly'  },
    { path: '/inventory',           priority: '0.9', changefreq: 'daily'   },
    { path: '/parts-service',       priority: '0.8', changefreq: 'monthly' },
    { path: '/financing',           priority: '0.8', changefreq: 'monthly' },
    { path: '/trailers',            priority: '0.7', changefreq: 'monthly' },
    { path: '/implements',          priority: '0.7', changefreq: 'monthly' },
    { path: '/trade-in',            priority: '0.8', changefreq: 'monthly' },
    { path: '/find-my-tractor',     priority: '0.8', changefreq: 'monthly' },
    { path: '/about',               priority: '0.6', changefreq: 'monthly' },
    { path: '/contact',             priority: '0.7', changefreq: 'monthly' },
    { path: '/reviews',             priority: '0.6', changefreq: 'weekly'  },
    { path: '/resources',           priority: '0.7', changefreq: 'monthly' },
    { path: '/resources/25hp-vs-40hp-compact-tractor',      priority: '0.6', changefreq: 'monthly' },
    { path: '/resources/mahindra-vs-tym-louisiana-acreage', priority: '0.6', changefreq: 'monthly' },
    { path: '/resources/section-179-equipment-buyers',      priority: '0.6', changefreq: 'monthly' },
    { path: '/dealer/alexandria-la',    priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/pineville-la',     priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/natchitoches-la',  priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/leesville-la',     priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/marksville-la',    priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/ball-la',          priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/tioga-la',         priority: '0.7', changefreq: 'monthly' },
    { path: '/dealer/boyce-la',         priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy',             priority: '0.3', changefreq: 'yearly'  },
    { path: '/terms',               priority: '0.3', changefreq: 'yearly'  },
];

function url(path: string, priority: string, changefreq: string): string {
    return `  <url>\n    <loc>${BASE}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // Try to fetch live inventory for equipment detail URLs
    let equipmentUrls: string[] = [];
    try {
        const proto = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers['x-forwarded-host'] || req.headers.host || 'reddirttractors.com';
        const inventoryRes = await fetch(`${proto}://${host}/api/inventory`);
        if (inventoryRes.ok) {
            const items = await inventoryRes.json() as Array<{ id: string | number }>;
            if (Array.isArray(items)) {
                equipmentUrls = items.map((item) =>
                    url(`/equipment/${item.id}`, '0.6', 'daily'),
                );
            }
        }
    } catch {
        // Inventory unavailable — sitemap will still include all static pages
    }

    const staticUrls = STATIC_PAGES.map((p) => url(p.path, p.priority, p.changefreq));
    const allUrls = [...staticUrls, ...equipmentUrls].join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
}
