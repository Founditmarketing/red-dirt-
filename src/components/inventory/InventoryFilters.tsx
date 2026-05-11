import type { Dispatch, SetStateAction } from 'react';

import { formatMoney } from '../../utils/inventoryDerive';

export type ConditionFilter = 'all' | 'new' | 'used';

export type RangesShape = {
    price: { min: number; max: number };
    hp: { min: number; max: number };
    year: { min: number; max: number };
};

type Props = {
    /** "dark" for the sticky desktop bar, "light" for the mobile sheet */
    tone?: 'dark' | 'light';
    makes: string[];
    categories: string[];
    activeMakes: Set<string>;
    setActiveMakes: Dispatch<SetStateAction<Set<string>>>;
    activeCategories: Set<string>;
    setActiveCategories: Dispatch<SetStateAction<Set<string>>>;
    conditionFilter: ConditionFilter;
    setConditionFilter: Dispatch<SetStateAction<ConditionFilter>>;
    ranges: RangesShape;
    priceMax: number;
    setPriceMax: Dispatch<SetStateAction<number>>;
    hpMin: number;
    setHpMin: Dispatch<SetStateAction<number>>;
    yearMin: number;
    setYearMin: Dispatch<SetStateAction<number>>;
};

const InventoryFilters = ({
    tone = 'dark',
    makes,
    categories,
    activeMakes,
    setActiveMakes,
    activeCategories,
    setActiveCategories,
    conditionFilter,
    setConditionFilter,
    ranges,
    priceMax,
    setPriceMax,
    hpMin,
    setHpMin,
    yearMin,
    setYearMin,
}: Props) => {
    const dark = tone === 'dark';

    const labelColor = dark ? 'text-white/45' : 'text-charcoal/45';
    const valueColor = dark ? 'text-white' : 'text-charcoal';
    const inactiveChip = dark
        ? 'bg-transparent text-white/70 border-white/15 hover:text-white hover:border-white/30'
        : 'bg-white text-charcoal/70 border-charcoal/15 hover:text-charcoal hover:border-charcoal/30';
    const activeMakeChip = dark
        ? 'bg-brand-red text-white border-brand-red'
        : 'bg-brand-red text-white border-brand-red';
    const activeCatChip = dark
        ? 'bg-white text-charcoal border-white'
        : 'bg-charcoal text-white border-charcoal';

    const toggleSet = (
        setter: Dispatch<SetStateAction<Set<string>>>,
        value: string,
    ) => {
        setter((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    return (
        <div className="space-y-5">
            {makes.length > 0 ? (
                <ChipRow
                    label="Make"
                    values={makes}
                    isActive={(v) => activeMakes.has(v)}
                    onToggle={(v) => toggleSet(setActiveMakes, v)}
                    activeClass={activeMakeChip}
                    inactiveClass={inactiveChip}
                    labelColor={labelColor}
                />
            ) : null}
            {categories.length > 0 ? (
                <ChipRow
                    label="Category"
                    values={categories}
                    isActive={(v) => activeCategories.has(v)}
                    onToggle={(v) => toggleSet(setActiveCategories, v)}
                    activeClass={activeCatChip}
                    inactiveClass={inactiveChip}
                    labelColor={labelColor}
                />
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${labelColor} mr-1`}>
                    Condition
                </span>
                {(['all', 'new', 'used'] as ConditionFilter[]).map((c) => {
                    const active = conditionFilter === c;
                    return (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setConditionFilter(c)}
                            aria-pressed={active}
                            className={`min-h-9 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] border transition-colors ${
                                active ? activeCatChip : inactiveChip
                            }`}
                        >
                            {c === 'all' ? 'All' : c.replace(/^./, (s) => s.toUpperCase())}
                        </button>
                    );
                })}
            </div>

            <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t ${
                    dark ? 'border-white/10' : 'border-charcoal/10'
                }`}
            >
                <RangeControl
                    label="Max price"
                    value={priceMax || ranges.price.max}
                    min={ranges.price.min || 0}
                    max={ranges.price.max || 100000}
                    step={500}
                    format={(v) => formatMoney(v)}
                    onChange={setPriceMax}
                    labelColor={labelColor}
                    valueColor={valueColor}
                />
                <RangeControl
                    label="Min HP"
                    value={hpMin || ranges.hp.min}
                    min={ranges.hp.min || 0}
                    max={ranges.hp.max || 100}
                    step={5}
                    format={(v) => `${v} HP`}
                    onChange={setHpMin}
                    labelColor={labelColor}
                    valueColor={valueColor}
                />
                <RangeControl
                    label="Min year"
                    value={yearMin || ranges.year.min}
                    min={ranges.year.min || 2010}
                    max={ranges.year.max || new Date().getFullYear()}
                    step={1}
                    format={(v) => String(v)}
                    onChange={setYearMin}
                    labelColor={labelColor}
                    valueColor={valueColor}
                />
            </div>
        </div>
    );
};

const ChipRow = ({
    label,
    values,
    isActive,
    onToggle,
    activeClass,
    inactiveClass,
    labelColor,
}: {
    label: string;
    values: string[];
    isActive: (v: string) => boolean;
    onToggle: (v: string) => void;
    activeClass: string;
    inactiveClass: string;
    labelColor: string;
}) => (
    <div className="flex flex-wrap items-center gap-2">
        <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${labelColor} mr-1`}>
            {label}
        </span>
        {values.map((v) => {
            const active = isActive(v);
            return (
                <button
                    key={v}
                    type="button"
                    onClick={() => onToggle(v)}
                    aria-pressed={active}
                    className={`min-h-9 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] border transition-colors ${
                        active ? activeClass : inactiveClass
                    }`}
                >
                    {v}
                </button>
            );
        })}
    </div>
);

const RangeControl = ({
    label,
    value,
    min,
    max,
    step,
    format,
    onChange,
    labelColor,
    valueColor,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    format: (v: number) => string;
    onChange: (v: number) => void;
    labelColor: string;
    valueColor: string;
}) => (
    <label className="block">
        <span
            className={`flex justify-between text-[10px] font-bold uppercase tracking-[0.25em] ${labelColor} mb-2`}
        >
            {label}
            <span className={`${valueColor}`}>{format(value)}</span>
        </span>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full accent-brand-red touch-pan-x"
        />
    </label>
);

export default InventoryFilters;
