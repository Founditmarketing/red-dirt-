export type ResourceArticle = {
    slug: string;
    title: string;
    eyebrow: string;
    summary: string;
    readTime: string;
    heroImage: string;
    sections: Array<{
        heading: string;
        body: string[];
    }>;
};

export const RESOURCE_ARTICLES: ResourceArticle[] = [
    {
        slug: '25hp-vs-40hp-compact-tractor',
        eyebrow: 'Buying guide',
        title: '25HP vs. 40HP Compact Tractor: Which Fits Your Land?',
        summary:
            'A practical guide for acreage owners choosing between small-frame convenience and heavier utility capability.',
        readTime: '6 min read',
        heroImage: '/hero_inventory.png',
        sections: [
            {
                heading: 'Start with the job, not the horsepower',
                body: [
                    'If most of your work is mowing, driveway maintenance, food plots, and light loader chores, a 25HP class tractor can be the right answer. It is easier to store, easier to trailer, and often avoids emissions complexity.',
                    'If you are moving round bales, maintaining larger acreage, pulling heavier cutters, or using ground-engaging implements, the 40HP class starts to make more sense.',
                ],
            },
            {
                heading: 'Frame size matters',
                body: [
                    'Horsepower gets the attention, but tractor weight and wheelbase often decide how confident the machine feels with a loader or box blade.',
                    'A heavier tractor usually gives you more traction, more stability, and better performance when the job gets rough.',
                ],
            },
            {
                heading: 'When to visit the lot',
                body: [
                    'Bring your acreage size, typical jobs, gate widths, trailer limits, and budget. We can walk you through models side by side and show the tradeoffs in person.',
                ],
            },
        ],
    },
    {
        slug: 'mahindra-vs-tym-louisiana-acreage',
        eyebrow: 'Brand comparison',
        title: 'Mahindra vs. TYM: Choosing for Louisiana Acreage',
        summary:
            'Both brands are strong. The right choice depends on frame weight, features, financing, warranty needs, and the jobs you repeat every week.',
        readTime: '7 min read',
        heroImage: '/hero_about.png',
        sections: [
            {
                heading: 'Where Mahindra shines',
                body: [
                    'Mahindra has a reputation for heavy-built tractors and straightforward utility. Buyers often like the mass, warranty story, and simple work-first feel.',
                ],
            },
            {
                heading: 'Where TYM shines',
                body: [
                    'TYM brings a strong mix of modern features, cab options, loader packages, and value across compact and utility sizes.',
                ],
            },
            {
                heading: 'The dealer factor',
                body: [
                    'Parts access, service turnaround, financing fit, and your attachment package matter as much as the badge. The best answer is the one that matches the work and can be supported locally.',
                ],
            },
        ],
    },
    {
        slug: 'section-179-equipment-buyers',
        eyebrow: 'Tax season',
        title: 'Section 179 for Equipment Buyers: What to Ask Before Year-End',
        summary:
            'A plain-English checklist for farmers and contractors considering a tractor, mower, trailer, or equipment purchase before tax deadlines.',
        readTime: '5 min read',
        heroImage: '/hero_transparency.png',
        sections: [
            {
                heading: 'Talk to your tax pro first',
                body: [
                    'Section 179 rules can change and every business is different. Before buying for a deduction, confirm eligibility, limits, timing, and whether the equipment must be placed in service by a specific date.',
                ],
            },
            {
                heading: 'Know your financing timeline',
                body: [
                    'Approval, delivery, and paperwork can take time near year-end. Start early if you want equipment ready before deadlines.',
                ],
            },
            {
                heading: 'Bring your numbers',
                body: [
                    'Your salesperson can help match equipment and financing options, but your accountant should tell you what structure actually helps your business.',
                ],
            },
        ],
    },
];
