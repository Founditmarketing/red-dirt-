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
    if (/(used|pre-owned|preowned|second\s*hand)/.test(value)) return 'used';
    if (/(new|brand new)/.test(value)) return 'new';
    return 'unknown';
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
        apr = 7.99,
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
