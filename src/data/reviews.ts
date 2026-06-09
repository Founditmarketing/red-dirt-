export type Review = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    name: 'Mark Lumpkin',
    role: 'Verified Buyer',
    text: 'Excellent customer service, very knowledgeable as well as helpful. We bought a Mahindra tractor and the process was smooth from start to finish.',
    rating: 5,
  },
  {
    name: 'Verified Customer',
    role: 'Local Farmer',
    text: "The customer service during my tractor purchase was absolutely amazing. They didn't just try to sell me a piece of equipment; they made sure I got exactly what I needed for my property.",
    rating: 5,
  },
  {
    name: 'Local Contractor',
    role: 'Heavy Equipment Buyer',
    text: 'Great selection of outdoor power equipment and tractors. The staff really knows their stuff when it comes to implements and financing options. Built on family values.',
    rating: 5,
  },
];
