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
    // 1. Dedicated HP column (e.g. "24", "55+ HP class").
    const raw = PICK(item, 'horsepower', 'hp', 'HP', 'Horsepower');
    if (raw) {
        const match = raw.match(/(\d+(?:\.\d+)?)/);
        if (match) {
            const n = parseFloat(match[1]);
            if (Number.isFinite(n)) return n;
        }
    }

    // 2. Fallback: many rows leave the HP column blank but state it in the
    // title/model (e.g. "2021 Yanmar 424 (24HP) HST"). Parse only a number that
    // is explicitly tagged "HP" so the badge stays consistent with the title and
    // we never mistake a year ("2021") or model number ("424") for horsepower.
    const text = PICK(
        item,
        'model', 'Model', 'item_name', 'name', 'title', 'description', 'Description',
    );
    if (text) {
        const match = text.match(/(\d+(?:\.\d+)?)\s*HP\b/i);
        if (match) {
            const n = parseFloat(match[1]);
            if (Number.isFinite(n)) return n;
        }
    }

    return null;
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

// ---------------------------------------------------------------------------
// Finance-office monthly notes
//
// The dealer's finance partner quotes an approximate monthly payment per used /
// demo unit. Until those figures live in the sheet, we keep them here keyed by
// the model number that appears in each listing's title. Word-boundary matches
// keep "424" off "T474" and "3025" off TYM's "T3025"; the price + condition
// guards in getProvidedMonthlyPayment keep them off unpriced new units that
// share a model number (e.g. the new "6065 PST/C" vs the used "6065 PST").
//
// Update these when the used units sell or new ones arrive — or move them into a
// "Monthly Payment" column in the sheet, which takes priority over this list.
// ---------------------------------------------------------------------------
const FINANCE_MONTHLY: Array<{ test: RegExp; monthly: number }> = [
    { test: /\b3650\b/i, monthly: 469.39 },   // 2022 Mahindra 3650 PST
    { test: /\b3025\b/i, monthly: 290.47 },   // 2022 John Deere 3025 Shuttle
    { test: /\b6065\b/i, monthly: 480.96 },   // 2023 Mahindra 6065 PST
    { test: /\b424\b/i, monthly: 266.0 },     // 2021 Yanmar 424 HST
    { test: /\b1635\b/i, monthly: 440.62 },   // 2024 Mahindra 1635 Cab Demo
    { test: /\b2850/i, monthly: 450.55 },     // 2024 Massey Ferguson 2850E Demo
    { test: /\b2655\b/i, monthly: 390.35 },   // 2019 Mahindra 2655 HST
    { test: /\b2660\b/i, monthly: 560.0 },    // 2023 Mahindra 2660 Cab Demo
    { test: /\b6075\b/i, monthly: 640.0 },    // 2022 Mahindra 6075 Cab
    { test: /1000s/i, monthly: 210.0 },       // 2018 Mahindra SxS XTV 1000S
    { test: /big\s*tex/i, monthly: 280.0 },   // 2022 Big Tex Gooseneck
    { test: /tiger\s*tex/i, monthly: 260.0 }, // 2022 Tiger Tex Gooseneck
];

/**
 * Approximate monthly payment to display for a unit, preferring real numbers
 * over the generic on-site estimate:
 *   1. An explicit per-row column from the sheet (if ever populated).
 *   2. The finance office's figures in FINANCE_MONTHLY, matched by model.
 * Both are limited to priced, non-new listings so a quoted note never appears
 * on a "Request Quote" new unit. Returns null when neither applies (the caller
 * then falls back to estimateMonthlyPayment).
 */
export const getProvidedMonthlyPayment = (item: LiveInventoryItem): number | null => {
    // 1. Explicit per-row column from the sheet always wins if populated.
    const raw = PICK(
        item,
        'monthly_payment', 'Monthly Payment', 'monthlyPayment',
        'monthly_note', 'Monthly Note', 'monthly_notes',
        'est_payment', 'estimated_payment', 'est_monthly', 'estimated_monthly',
        'payment', 'Payment',
        'monthly', 'Monthly',
    );
    if (raw) {
        const n = parsePriceNumber(raw);
        if (n !== null && n > 0) return n;
    }

    // 2. Finance-office figures keyed by model. Skip unpriced ("quote-only") and
    // new units so the numbers only land on the used/demo listings they describe.
    if (parsePriceNumber(item.price) === null) return null;
    if (getCondition(item) === 'new') return null;
    const text = [item.make, item.model, item.Model, item.item_name, item.name, item.title]
        .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
        .join(' ');
    for (const { test, monthly } of FINANCE_MONTHLY) {
        if (test.test(text)) return monthly;
    }

    return null;
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
