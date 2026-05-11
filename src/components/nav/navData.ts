import {
    Banknote,
    BookOpen,
    Building2,
    CalendarCheck,
    ClipboardCheck,
    Coins,
    Compass,
    HandshakeIcon,
    type LucideIcon,
    MapPin,
    MessageCircle,
    Package,
    PenLine,
    Star,
    Sparkles,
    Tractor,
    Truck,
    Wrench,
} from 'lucide-react';

export type NavLeaf = {
    to: string;
    label: string;
    description?: string;
    icon?: LucideIcon;
    badge?: string;
};

export type NavGroup = {
    id: string;
    label: string;
    items: NavLeaf[];
    feature: {
        eyebrow: string;
        title: string;
        copy: string;
        ctaLabel: string;
        ctaTo: string;
        image: string;
    };
};

export const NAV_GROUPS: NavGroup[] = [
    {
        id: 'shop',
        label: 'Shop',
        items: [
            {
                to: '/inventory',
                label: 'Tractor Inventory',
                description: 'Live stock filtered by brand, category, or price.',
                icon: Tractor,
            },
            {
                to: '/implements',
                label: 'Implements & Attachments',
                description: 'Cutters, blades, augers, grapples, forks.',
                icon: Package,
            },
            {
                to: '/trailers',
                label: 'Trailers',
                description: 'Load Trail and East Texas dealer.',
                icon: Truck,
            },
            {
                to: '/find-my-tractor',
                label: 'Find My Tractor',
                description: 'Six questions, two real recommendations.',
                icon: Sparkles,
                badge: 'Quiz',
            },
            {
                to: '/trade-in',
                label: 'Trade-In Valuation',
                description: 'Send the basics, get a real number.',
                icon: ClipboardCheck,
            },
        ],
        feature: {
            eyebrow: 'Now on the lot',
            title: 'Browse live inventory',
            copy: 'Updated daily from our floor. Filter by brand, category, or price and skip the guesswork.',
            ctaLabel: 'Open inventory',
            ctaTo: '/inventory',
            image: '/tractors/12.jpg',
        },
    },
    {
        id: 'service',
        label: 'Service',
        items: [
            {
                to: '/parts-service',
                label: 'Parts & Service',
                description: 'Factory-trained techs and a deep parts counter.',
                icon: Wrench,
            },
            {
                to: '/parts-service#schedule',
                label: 'Schedule Service',
                description: 'Book in-shop or mobile service appointments.',
                icon: CalendarCheck,
            },
            {
                to: '/parts-service#warranty',
                label: 'Warranty',
                description: 'Brand warranty support, claims, and history.',
                icon: HandshakeIcon,
            },
        ],
        feature: {
            eyebrow: 'In-shop and in-field',
            title: 'Service without the runaround',
            copy: 'Drop it off, schedule a field call, or call the parts counter. Real techs, real availability.',
            ctaLabel: 'Open service',
            ctaTo: '/parts-service',
            image: '/hero_parts_service.png',
        },
    },
    {
        id: 'finance',
        label: 'Finance',
        items: [
            {
                to: '/financing',
                label: 'Financing Options',
                description: 'Mahindra Finance, DLL, Sheffield, Synchrony, Vibrant.',
                icon: Banknote,
            },
            {
                to: '/financing#prequalify',
                label: 'Pre-Qualify',
                description: 'Check available rates and apply with our lending partners.',
                icon: Coins,
            },
            {
                to: '/trade-in',
                label: 'Trade-In Valuation',
                description: 'Lower the cash gap with your existing iron.',
                icon: ClipboardCheck,
            },
        ],
        feature: {
            eyebrow: 'Straight conversation',
            title: 'No mystery fees',
            copy: 'We work with major brand finance partners and tell you up front what fits your acreage and budget.',
            ctaLabel: 'Open financing',
            ctaTo: '/financing',
            image: '/hero_transparency.png',
        },
    },
    {
        id: 'company',
        label: 'Company',
        items: [
            {
                to: '/about',
                label: 'About Red Dirt',
                description: 'Family owned, field tested, still hungry.',
                icon: Building2,
            },
            {
                to: '/reviews',
                label: 'Reviews',
                description: 'Verified buyers and the word from the field.',
                icon: Star,
            },
            {
                to: '/resources',
                label: 'Resource Center',
                description: 'Buying guides, financing explainers, ownership tips.',
                icon: BookOpen,
            },
            {
                to: '/contact',
                label: 'Visit & Hours',
                description: '7547 Hwy 71 South, Alexandria, LA.',
                icon: MapPin,
            },
            {
                to: '/dealer/alexandria-la',
                label: 'Service Area',
                description: 'Dedicated pages for nearby cities.',
                icon: Compass,
            },
        ],
        feature: {
            eyebrow: 'Built in Louisiana',
            title: 'A real dealership, not a brochure',
            copy: 'Working bays, a parts room with depth, and a team that picks up the phone.',
            ctaLabel: 'Read our story',
            ctaTo: '/about',
            image: '/hero_about.png',
        },
    },
];

export const SECONDARY_LINKS: Array<{ to: string; label: string; icon?: LucideIcon }> = [
    { to: '/find-my-tractor', label: 'Find My Tractor', icon: Sparkles },
    { to: '/trade-in', label: 'Trade-In', icon: ClipboardCheck },
    { to: '/resources', label: 'Resources', icon: BookOpen },
];

export const QUICK_ACTIONS: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
    primary?: boolean;
}> = [
    { href: 'tel:3184429010', label: 'Call', icon: PenLine },
    { href: 'sms://+13184429010', label: 'Text', icon: MessageCircle, primary: true },
];
