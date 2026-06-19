import type { LiveInventoryItem } from '../context/InventoryContext';

export const parsePriceNumber = (raw: unknown): number | null => {
    if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
    if (typeof raw !== 'string') return null;
    const digits = raw.replace(/[^0-9.]/g, '');
    if (!digits) return null;
    const n = parseFloat(digits);
    return Number.isFinite(n) ? n : null;
};

const PICK = (item: any, ...keys: string[]): string | undefined => {
    for (const key of keys) {
        const value = item?.[key];
        if (typeof value === 'string' && value.trim() !== '') return value.trim();
        if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    }
    return undefined;
};

export const getYear = (item: LiveInventoryItem): number | null => {
    const raw = PICK(item, 'year', 'Year');
    if (!raw) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
};

export const getHorsepower = (item: LiveInventoryItem): number | null => {
    const raw = PICK(item, 'horsepower', 'hp', 'HP', 'Horsepower');
    if (!raw) return null;
    const match = raw.match(/(\d+(?:\.\d+)?)/);
    if (!match) return null;
    const n = parseFloat(match[1]);
    return Number.isFinite(n) ? n : null;
};

export type Condition = 'new' | 'used' | 'unknown';

export const getCondition = (item: LiveInventoryItem): Condition => {
    const raw =
        PICK(item, 'condition', 'Condition', 'status', 'Status') ||
        PICK(item, 'category', 'Category') ||
        '';
    const value = raw.toLowerCase();
    // Demo / demonstrator units are grouped with pre-owned ("used").
    if (/(used|pre-owned|preowned|second\s*hand|demo)/.test(value)) return 'used';
    if (/(new|brand new)/.test(value)) return 'new';
    return 'unknown';
};

/**
 * True when the Condition column marks the unit as a demo / demonstrator.
 * Demos sit under Pre-Owned but get a distinct "Demo" badge on site.
 */
export const isDemo = (item: LiveInventoryItem): boolean => {
    const raw = PICK(item, 'condition', 'Condition', 'status', 'Status') || '';
    return /demo/i.test(raw);
};

export const getHours = (item: LiveInventoryItem): number | null => {
    const raw = PICK(item, 'hours', 'Hours', 'engineHours');
    if (!raw) return null;
    const match = raw.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
    if (!match) return null;
    const n = parseFloat(match[1]);
    return Number.isFinite(n) ? n : null;
};

export type PaymentEstimate = {
    monthly: number;
    apr: number;
    termMonths: number;
    downPayment: number;
};

export const estimateMonthlyPayment = (
    price: number,
    {
        apr = 7.10,
        termMonths = 84,
        downPayment = 0,
    }: { apr?: number; termMonths?: number; downPayment?: number } = {},
): PaymentEstimate => {
    const principal = Math.max(0, price - downPayment);
    const monthlyRate = apr / 100 / 12;
    let monthly = 0;
    if (monthlyRate === 0) {
        monthly = principal / termMonths;
    } else {
        monthly =
            (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
            (Math.pow(1 + monthlyRate, termMonths) - 1);
    }
    return {
        monthly: Math.max(0, Math.round(monthly)),
        apr,
        termMonths,
        downPayment,
    };
};

export const formatMoney = (n: number) =>
    n.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

// ---------------------------------------------------------------------------
// Equipment classification
//
// The Google Sheet rarely fills in a clean "category" column, so we infer the
// equipment type from everything that describes the unit: the make/brand, the
// model code, the title, the description, attachments, and the image filename.
// Brand is the strongest signal (Ferris => mowers, Wacker Neuson =>
// construction, etc.); model codes and keywords cover rows with a blank make.
// ---------------------------------------------------------------------------

export type EquipmentType = 'tractor' | 'zero-turn' | 'construction' | 'implement' | 'trailer';

const lc = (v: unknown): string =>
    typeof v === 'string' ? v.toLowerCase() : typeof v === 'number' ? String(v) : '';

// Identity fields only (make/brand/model/title). Safe to match brand names
// against — avoids false positives from common words in the description
// (e.g. "ready to clear the woods" should not read as the Woods brand).
const getBrandText = (item: any): string =>
    [
        item?.make, item?.brand, item?.Make, item?.Brand,
        item?.model, item?.Model, item?.item_name, item?.name, item?.title,
    ]
        .map(lc)
        .filter(Boolean)
        .join('  ');

// Everything that might describe what the unit is.
const getHaystack = (item: any): string => {
    if (!item || typeof item !== 'object') return '';
    return [
        item.make, item.brand, item.model, item.item_name, item.name, item.title,
        item.category, item.type, item.subcategory, item.description, item.desc,
        item.attachments, item.features, item.useCase, item.use_case, item.usecase,
        item['Image URL'], item.image_url, item.images, item.image, item.photos,
    ]
        .map(lc)
        .filter(Boolean)
        .join('  ');
};

const anyMatch = (text: string, patterns: RegExp[]): boolean =>
    patterns.some((re) => re.test(text));

// Brand (matched against identity fields only) -> equipment type.
const BRAND_TYPE: Array<{ test: RegExp; type: EquipmentType }> = [
    { test: /\bferris\b/, type: 'zero-turn' },
    { test: /\bwacker\s*neuson\b|\bwacker\b|\bneuson\b/, type: 'construction' },
    { test: /\bload\s*trail\b|\beast\s*texas\b|\b(big\s*tex|pj\s*trailers?)\b/, type: 'trailer' },
    { test: /\bwoods\b|\bpremier\b|\bbaumalight\b|\bsidewinder\b|\bland\s*pride\b|\brhino\b/, type: 'implement' },
    { test: /\btym\b/, type: 'tractor' },
    { test: /\bmahindra\b/, type: 'tractor' },
    { test: /\bkioti\b|\bkubota\b|\bjohn\s*deere\b|\bbranson\b|\bls\s*tractor\b|\bbobcat\s*tractor\b/, type: 'tractor' },
];

const UTV_RE = [/\broxor\b/, /\bretriever\b/, /\butv\b/, /\bside[\s-]*by[\s-]*side\b/];

const TRAILER_RE = [
    /\btrailer\b/, /\bgooseneck\b/, /\bdeckover\b/, /\bdump\s*trailer\b/,
    /\bcar\s*hauler\b/, /\btilt\s*(bed|trailer)\b/, /\butility\s*trailer\b/,
    /\bequipment\s*trailer\b/, /\bbumper\s*pull\b/, /\bgvwr\b/,
];
const CONSTRUCTION_RE = [
    /\bexcavator\b/, /\bmini[\s-]*ex/, /\bskid[\s-]*steer\b/, /\btrack\s*loader\b/,
    /\bcompact\s*track\s*loader\b/, /\bctl\b/, /\bwheel\s*loader\b/, /\btelehandler\b/,
    /\btelescopic\s*handler\b/, /\bdumper\b/, /\brammer\b/, /\bplate\s*compactor\b/,
    /\bcompactor\b/, /\blight\s*tower\b/, /\bbackhoe\s*loader\b/, /\bskid\s*loader\b/,
];
const IMPLEMENT_RE = [
    /\brotary\s*cutter\b/, /\bfinish\s*mower\b/, /\bflail\s*mower\b/, /\bbox\s*(blade|scraper)\b/,
    /\bbrush\s*(hog|cutter)\b/, /\bpost\s*hole\b/, /\bauger\b/, /\bgrapple\b/, /\bpallet\s*fork/,
    /\btiller\b/, /\bstump\s*grinder\b/, /\bmulcher\b/, /\bsnow\s*(blade|blower|plow)\b/,
    /\blanding\s*plane\b/, /\bdisc\s*harrow\b/, /\brear\s*blade\b/, /\bland\s*plane\b/,
    /\bimplement\b/, /\battachment\b/, /\bquick\s*hitch\b/, /\bspreader\b/,
];
const ZEROTURN_RE = [
    /\bzero[\s-]*turn\b/, /\bztr\b/, /\bstand[\s-]*on\b/, /\bwalk[\s-]*behind\b/,
    /\briding\s*mower\b/, /\blawn\s*mower\b/, /\bmower\b/,
];
const TRACTOR_RE = [
    /\btractor\b/, /\bcompact\s*tractor\b/, /\bsub[\s-]*compact\b/, /\butility\s*tractor\b/,
    /\bcab\s*tractor\b/, /\bloader\s*tractor\b/,
];
// TYM model codes such as "T474", "T5075 PS/C", "T25 HST".
const TYM_MODEL_RE = /\bt-?\s?\d{2,4}[a-z/]*\b/;

/**
 * Infer the single best equipment type for an inventory item.
 * Returns null when nothing identifies it (it still shows in the full list).
 */
export const getEquipmentType = (item: any): EquipmentType | null => {
    const brandText = getBrandText(item);
    const hay = getHaystack(item);
    if (!hay) return null;

    // 1. Trust the brand/make first.
    for (const { test, type } of BRAND_TYPE) {
        if (test.test(brandText)) {
            // Mahindra also sells Roxor/Retriever UTVs — those are not tractors.
            if (type === 'tractor' && anyMatch(hay, UTV_RE)) return null;
            return type;
        }
    }

    // 2. No known brand — infer from words/model codes, most specific first.
    if (anyMatch(hay, TRAILER_RE)) return 'trailer';
    if (anyMatch(hay, CONSTRUCTION_RE)) return 'construction';
    if (anyMatch(hay, IMPLEMENT_RE) && !anyMatch(hay, TRACTOR_RE)) return 'implement';
    if (anyMatch(hay, ZEROTURN_RE)) return 'zero-turn';
    if (anyMatch(hay, TRACTOR_RE) || TYM_MODEL_RE.test(hay)) return 'tractor';

    return null;
};

export const matchesEquipmentType = (item: any, type: EquipmentType): boolean =>
    getEquipmentType(item) === type;
