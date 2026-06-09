export type DealerCity = {
    slug: string;
    name: string;
    state: string;
    distance: string;
    summary: string;
    serves: string[];
};

export const DEALER_CITIES: DealerCity[] = [
    {
        slug: 'alexandria-la',
        name: 'Alexandria',
        state: 'LA',
        distance: 'Headquarters',
        summary:
            'Our flagship location on Hwy 71 South serves Alexandria with full sales, parts, service, financing, and trade-ins.',
        serves: ['Alexandria proper', 'England Airpark', 'North Bank', 'South Hwy 71 corridor'],
    },
    {
        slug: 'pineville-la',
        name: 'Pineville',
        state: 'LA',
        distance: 'About 10 minutes',
        summary:
            'Pineville landowners and contractors rely on our Alexandria store for tractors, mowers, and certified service.',
        serves: ['Pineville', 'Tioga area', 'Highway 165 north corridor'],
    },
    {
        slug: 'natchitoches-la',
        name: 'Natchitoches',
        state: 'LA',
        distance: 'About 1 hour',
        summary:
            'Customers from Natchitoches Parish travel to Red Dirt for the brands, parts depth, and dealer service support.',
        serves: ['Natchitoches', 'Cane River area', 'Robeline corridor'],
    },
    {
        slug: 'leesville-la',
        name: 'Leesville',
        state: 'LA',
        distance: 'About 1 hour',
        summary:
            'Leesville buyers count on Red Dirt for utility tractors, zero-turns, and trailers for big timber and pasture jobs.',
        serves: ['Leesville', 'Fort Polk area', 'Anacoco', 'New Llano'],
    },
    {
        slug: 'marksville-la',
        name: 'Marksville',
        state: 'LA',
        distance: 'About 35 minutes',
        summary:
            'Avoyelles Parish customers come to Red Dirt for tractors, implements, and trailers for cropland and hay work.',
        serves: ['Marksville', 'Hessmer', 'Bunkie corridor'],
    },
    {
        slug: 'ball-la',
        name: 'Ball',
        state: 'LA',
        distance: 'About 15 minutes',
        summary:
            'Ball and the surrounding Hwy 165 communities are part of our regular field-service and trade-in route.',
        serves: ['Ball', 'Pollock corridor', 'Tioga area'],
    },
    {
        slug: 'tioga-la',
        name: 'Tioga',
        state: 'LA',
        distance: 'About 12 minutes',
        summary:
            'Tioga homeowners and farm operations choose Red Dirt for compact tractors, mowers, and parts on demand.',
        serves: ['Tioga', 'Ruby', 'Ball corridor'],
    },
    {
        slug: 'boyce-la',
        name: 'Boyce',
        state: 'LA',
        distance: 'About 25 minutes',
        summary:
            'Boyce and the Hwy 1 corridor rely on Red Dirt for tractors, trailers, and fast parts turnaround.',
        serves: ['Boyce', 'Gardner', 'Hwy 1 corridor'],
    },
];
