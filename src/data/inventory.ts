// We export a flexible generic interface since columns from Google Sheets can vary.
export interface TractorItem {
    id: string | number;
    [key: string]: any;
}

export const FALLBACK_INVENTORY: TractorItem[] = [
    {
        id: 'quote-tym-574',
        make: 'TYM',
        model: 'T574 Cab',
        category: 'Compact Tractor',
        price: 'Request Quote',
        availability: 'Quote Ready',
        image: '/tractors/12.jpg',
        description:
            'A top-requested cab tractor for landowners who need comfort, loader work, mowing, grading, and year-round chores in one machine.',
        features:
            'Cab with heat and A/C, 55+ HP class, Loader-ready, Hydrostatic transmission options, Financing available',
        horsepower: '55+ HP class',
        drivetrain: '4WD',
        useCase: 'Acreage, mowing, grading, loader work',
    },
    {
        id: 'quote-mahindra-4540',
        make: 'Mahindra',
        model: '4540',
        category: 'Utility Tractor',
        price: 'Request Quote',
        availability: 'Quote Ready',
        image: '/tractors/7.jpg',
        description:
            'A simple, heavy-built utility tractor for customers who want weight, pulling power, and long-term serviceability.',
        features:
            '40+ HP class, Heavy chassis, Loader compatible, 4WD available, Strong warranty support',
        horsepower: '40+ HP class',
        drivetrain: '2WD / 4WD options',
        useCase: 'Pasture maintenance, hay work, grading',
    },
    {
        id: 'quote-tym-2515',
        make: 'TYM',
        model: '2515H',
        category: 'Compact Tractor',
        price: 'Request Quote',
        availability: 'Quote Ready',
        image: '/tractors/3.jpg',
        description:
            'A compact acreage tractor sized for first-time owners who need real capability without jumping into a larger frame.',
        features:
            '25 HP class, Hydrostatic drive, Loader compatible, Mid-size frame, Ideal for small acreage',
        horsepower: '25 HP class',
        drivetrain: '4WD',
        useCase: 'Small acreage, driveway work, food plots',
    },
    {
        id: 'quote-ferris-isx',
        make: 'Ferris',
        model: 'ISX Series',
        category: 'Zero-Turn Mower',
        price: 'Request Quote',
        availability: 'Quote Ready',
        image: '/rendition-14.jpeg',
        description:
            'Commercial-grade zero-turn performance with suspension comfort for crews and landowners who mow serious acreage.',
        features:
            'Commercial suspension, Wide deck options, Fleet-ready durability, Financing available',
        horsepower: 'Commercial engine options',
        drivetrain: 'Hydrostatic',
        useCase: 'Commercial mowing, estate mowing, acreage',
    },
];
