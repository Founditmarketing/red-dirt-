import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Plus, Scale, Search, Settings, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useInventory } from '../context/InventoryContext';
import { useCompare } from '../context/CompareContext';
import SaveButton from '../components/SaveButton';
import { processGoogleDriveUrl } from '../utils/imageFormat';
import {
    estimateMonthlyPayment,
    formatMoney,
    getCondition,
    getHorsepower,
    getYear,
    parsePriceNumber,
    type Condition,
} from '../utils/inventoryDerive';
import InventoryFilters, {
    type ConditionFilter,
} from '../components/inventory/InventoryFilters';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'make-asc' | 'hp-desc';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

const Inventory = () => {
    const { inventory, loading, isFallbackInventory } = useInventory();
    const { ids: compareIds, canAdd, toggle: toggleCompare } = useCompare();

    const [query, setQuery] = useState('');
    const [activeMakes, setActiveMakes] = useState<Set<string>>(new Set());
    const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
    const [conditionFilter, setConditionFilter] = useState<ConditionFilter>('all');
    const [sortKey, setSortKey] = useState<SortKey>('featured');
    const [desktopAdvancedOpen, setDesktopAdvancedOpen] = useState(false);
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

    const makes = useMemo(() => {
        const set = new Set<string>();
        inventory.forEach((t) => {
            if (t.make && typeof t.make === 'string') set.add(t.make.trim());
        });
        return Array.from(set).sort();
    }, [inventory]);

    const categories = useMemo(() => {
        const set = new Set<string>();
        inventory.forEach((t) => {
            if (t.category && typeof t.category === 'string') set.add(t.category.trim());
        });
        return Array.from(set).sort();
    }, [inventory]);

    const ranges = useMemo(() => {
        let minPrice = Infinity;
        let maxPrice = 0;
        let minHp = Infinity;
        let maxHp = 0;
        let minYear = Infinity;
        let maxYear = 0;
        inventory.forEach((item) => {
            const price = parsePriceNumber(item.price);
            if (price !== null) {
                if (price < minPrice) minPrice = price;
                if (price > maxPrice) maxPrice = price;
            }
            const hp = getHorsepower(item);
            if (hp !== null) {
                if (hp < minHp) minHp = hp;
                if (hp > maxHp) maxHp = hp;
            }
            const yr = getYear(item);
            if (yr !== null) {
                if (yr < minYear) minYear = yr;
                if (yr > maxYear) maxYear = yr;
            }
        });
        return {
            price: { min: Number.isFinite(minPrice) ? minPrice : 0, max: maxPrice || 100000 },
            hp: { min: Number.isFinite(minHp) ? minHp : 15, max: maxHp || 100 },
            year: {
                min: Number.isFinite(minYear) ? minYear : 2015,
                max: maxYear || new Date().getFullYear(),
            },
        };
    }, [inventory]);

    const [priceMax, setPriceMax] = useState<number>(0);
    const [hpMin, setHpMin] = useState<number>(0);
    const [yearMin, setYearMin] = useState<number>(0);

    useEffect(() => {
        setPriceMax(ranges.price.max);
        setHpMin(ranges.hp.min);
        setYearMin(ranges.year.min);
    }, [ranges.price.max, ranges.hp.min, ranges.year.min]);

    useEffect(() => {
        if (mobileSheetOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [mobileSheetOpen]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = inventory.filter((t) => {
            if (activeMakes.size > 0 && !activeMakes.has((t.make || '').trim())) return false;
            if (
                activeCategories.size > 0 &&
                !activeCategories.has((t.category || '').trim())
            ) {
                return false;
            }
            if (conditionFilter !== 'all') {
                const c = getCondition(t);
                if (c !== (conditionFilter as Condition)) return false;
            }
            const price = parsePriceNumber(t.price);
            if (price !== null && priceMax > 0 && price > priceMax) return false;

            const hp = getHorsepower(t);
            if (hp !== null && hp < hpMin) return false;

            const yr = getYear(t);
            if (yr !== null && yr < yearMin) return false;

            if (q) {
                const haystack = [t.make, t.model, t.category, t.description]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                if (!haystack.includes(q)) return false;
            }
            return true;
        });

        switch (sortKey) {
            case 'price-asc':
                return [...list].sort((a, b) => {
                    const pa = parsePriceNumber(a.price) ?? Infinity;
                    const pb = parsePriceNumber(b.price) ?? Infinity;
                    return pa - pb;
                });
            case 'price-desc':
                return [...list].sort((a, b) => {
                    const pa = parsePriceNumber(a.price) ?? -Infinity;
                    const pb = parsePriceNumber(b.price) ?? -Infinity;
                    return pb - pa;
                });
            case 'hp-desc':
                return [...list].sort((a, b) => {
                    const ha = getHorsepower(a) ?? -Infinity;
                    const hb = getHorsepower(b) ?? -Infinity;
                    return hb - ha;
                });
            case 'make-asc':
                return [...list].sort((a, b) => (a.make || '').localeCompare(b.make || ''));
            case 'featured':
            default:
                return list;
        }
    }, [
        inventory,
        query,
        activeMakes,
        activeCategories,
        conditionFilter,
        priceMax,
        hpMin,
        yearMin,
        sortKey,
    ]);

    const setPriceMaxClamped = (v: React.SetStateAction<number>) => {
        setPriceMax((prev) => {
            const raw = typeof v === 'function' ? (v as (n: number) => number)(prev) : v;
            return clamp(raw, ranges.price.min || 0, ranges.price.max || 100000);
        });
    };
    const setHpMinClamped = (v: React.SetStateAction<number>) => {
        setHpMin((prev) => {
            const raw = typeof v === 'function' ? (v as (n: number) => number)(prev) : v;
            return clamp(raw, ranges.hp.min || 0, ranges.hp.max || 100);
        });
    };
    const setYearMinClamped = (v: React.SetStateAction<number>) => {
        setYearMin((prev) => {
            const raw = typeof v === 'function' ? (v as (n: number) => number)(prev) : v;
            return clamp(
                raw,
                ranges.year.min || 2010,
                ranges.year.max || new Date().getFullYear(),
            );
        });
    };

    const clearAll = () => {
        setQuery('');
        setActiveMakes(new Set());
        setActiveCategories(new Set());
        setConditionFilter('all');
        setPriceMax(ranges.price.max);
        setHpMin(ranges.hp.min);
        setYearMin(ranges.year.min);
        setSortKey('featured');
    };

    const activeCount =
        (query ? 1 : 0) +
        activeMakes.size +
        activeCategories.size +
        (conditionFilter !== 'all' ? 1 : 0) +
        (priceMax !== ranges.price.max ? 1 : 0) +
        (hpMin !== ranges.hp.min ? 1 : 0) +
        (yearMin !== ranges.year.min ? 1 : 0) +
        (sortKey !== 'featured' ? 1 : 0);

    const hasFilters = activeCount > 0;

    const pageTitle = isFallbackInventory ? 'Top requested equipment.' : `${inventory.length} machines.`;
    const pageSubtitle = isFallbackInventory ? 'Quote ready.' : 'One yard.';
    const metaDescription = isFallbackInventory
        ? 'Explore top-requested tractors, mowers, and equipment Red Dirt Tractors can quote, source, finance, and configure for Central Louisiana buyers.'
        : `Browse ${inventory.length} new and pre-owned tractors and equipment in stock at Red Dirt Tractors on Hwy 71 South in Alexandria, Louisiana.`;

    const inventorySchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: isFallbackInventory
            ? 'Top Requested Equipment at Red Dirt Tractors'
            : 'Live Equipment Inventory at Red Dirt Tractors',
        itemListElement: inventory.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: [item.make, item.model].filter(Boolean).join(' '),
                brand: item.make,
                category: item.category,
                image:
                    typeof item.image === 'string'
                        ? `https://reddirt-tractors.com${item.image}`
                        : undefined,
                description: item.description,
                offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStock',
                    priceCurrency: 'USD',
                    price: parsePriceNumber(item.price) ?? undefined,
                    url: `https://reddirt-tractors.com/equipment/${item.id}`,
                },
            },
        })),
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-off-white flex items-center justify-center pt-24">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-bold text-charcoal/50 uppercase tracking-widest">
                        Connecting to live inventory...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white pb-32">
            <Helmet>
                <title>Equipment Inventory | Red Dirt Tractors in Alexandria, LA</title>
                <meta name="description" content={metaDescription} />
                <script type="application/ld+json">{JSON.stringify(inventorySchema)}</script>
            </Helmet>

            {/* Editorial header */}
            <section className="pt-28 md:pt-36 pb-10 md:pb-12">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                    <div className="lg:col-span-7">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-5">
                            {isFallbackInventory ? 'Live feed syncing' : 'On the lot'}
                        </p>
                        <h1 className="font-heading font-black uppercase text-charcoal leading-[0.92] sm:leading-[0.9] tracking-tight text-4xl sm:text-6xl md:text-7xl">
                            {pageTitle}
                            <br />
                            <span className="text-brand-red">{pageSubtitle}</span>
                        </h1>
                    </div>
                    <div className="lg:col-span-5">
                        <p className="text-charcoal/70 leading-relaxed font-medium max-w-md lg:ml-auto">
                            {isFallbackInventory
                                ? 'Our live sheet is unavailable right now, so we are showing high-demand models our team can quote, source, finance, and configure fast.'
                                : 'Live from our Google Sheet. If it is on this page, it is on our lot or on the way. Filter by brand, category, price, HP, year, or condition.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter bar */}
            <section
                className="bg-charcoal text-white sticky z-30 border-y border-white/10"
                style={{ top: 'var(--nav-height, 80px)' }}
            >
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-5">
                    <div className="flex items-center gap-2 md:gap-4">
                        <label className="relative flex-1 min-w-0">
                            <span className="sr-only">Search inventory</span>
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                            />
                            <input
                                type="search"
                                inputMode="search"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck={false}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search inventory"
                                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-red focus:bg-white/10 transition-colors pl-10 pr-9 py-3 min-h-12 text-sm text-white placeholder:text-white/40 focus:outline-none rounded-sm"
                            />
                            {query ? (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    aria-label="Clear search"
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-w-9 min-h-9 text-white/60 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            ) : null}
                        </label>

                        {/* Mobile: Filters button */}
                        <button
                            type="button"
                            onClick={() => setMobileSheetOpen(true)}
                            className={`md:hidden inline-flex items-center gap-2 min-h-12 px-3 text-[11px] font-bold uppercase tracking-[0.2em] border rounded-sm transition-colors shrink-0 ${
                                activeCount > 0
                                    ? 'bg-brand-red text-white border-brand-red'
                                    : 'bg-transparent border-white/15 text-white/85 hover:text-white hover:border-white/30'
                            }`}
                            aria-haspopup="dialog"
                            aria-expanded={mobileSheetOpen}
                        >
                            <SlidersHorizontal size={14} />
                            Filters
                            {activeCount > 0 ? (
                                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-white text-brand-red text-[10px] font-black">
                                    {activeCount}
                                </span>
                            ) : null}
                        </button>

                        {/* Desktop: sort + advanced */}
                        <div className="hidden md:flex items-center gap-2 shrink-0">
                            <label className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/45">
                                Sort
                            </label>
                            <select
                                value={sortKey}
                                onChange={(e) => setSortKey(e.target.value as SortKey)}
                                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand-red transition-colors px-3 py-2.5 min-h-12 text-sm text-white focus:outline-none rounded-sm"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: low to high</option>
                                <option value="price-desc">Price: high to low</option>
                                <option value="hp-desc">Most horsepower</option>
                                <option value="make-asc">Make: A to Z</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => setDesktopAdvancedOpen((v) => !v)}
                                aria-expanded={desktopAdvancedOpen}
                                className={`inline-flex items-center gap-2 px-3 py-2.5 min-h-12 text-[11px] font-bold uppercase tracking-[0.2em] border rounded-sm transition-colors ${
                                    desktopAdvancedOpen
                                        ? 'bg-brand-red text-white border-brand-red'
                                        : 'bg-transparent border-white/15 text-white/75 hover:text-white hover:border-white/30'
                                }`}
                            >
                                <SlidersHorizontal size={14} />
                                Filters
                            </button>
                        </div>

                        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/55 shrink-0 hidden sm:block">
                            {isFallbackInventory
                                ? `${filtered.length} ready`
                                : `${filtered.length} of ${inventory.length}`}
                        </p>
                    </div>

                    {/* Mobile: small inline sort + count row, no chips here */}
                    <div className="md:hidden mt-3 flex items-center justify-between gap-3">
                        <label className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/45 shrink-0">
                                Sort
                            </span>
                            <select
                                value={sortKey}
                                onChange={(e) => setSortKey(e.target.value as SortKey)}
                                className="flex-1 min-w-0 bg-white/5 border border-white/10 focus:border-brand-red transition-colors px-3 py-2.5 min-h-11 text-sm text-white focus:outline-none rounded-sm"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: low to high</option>
                                <option value="price-desc">Price: high to low</option>
                                <option value="hp-desc">Most horsepower</option>
                                <option value="make-asc">Make: A to Z</option>
                            </select>
                        </label>
                        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/55 shrink-0">
                            {isFallbackInventory
                                ? `${filtered.length}`
                                : `${filtered.length}/${inventory.length}`}
                        </p>
                    </div>

                    {/* Desktop only: inline filters */}
                    {desktopAdvancedOpen ? (
                        <div className="hidden md:block mt-5 pt-5 border-t border-white/10">
                            <InventoryFilters
                                tone="dark"
                                makes={makes}
                                categories={categories}
                                activeMakes={activeMakes}
                                setActiveMakes={setActiveMakes}
                                activeCategories={activeCategories}
                                setActiveCategories={setActiveCategories}
                                conditionFilter={conditionFilter}
                                setConditionFilter={setConditionFilter}
                                ranges={ranges}
                                priceMax={priceMax}
                                setPriceMax={setPriceMaxClamped}
                                hpMin={hpMin}
                                setHpMin={setHpMinClamped}
                                yearMin={yearMin}
                                setYearMin={setYearMinClamped}
                            />
                        </div>
                    ) : null}

                    {hasFilters ? (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="hidden md:inline-flex mt-4 items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-white/65 hover:text-white"
                        >
                            Clear all
                            <X size={12} />
                        </button>
                    ) : null}
                </div>
            </section>

            {/* Mobile filter sheet */}
            <AnimatePresence>
                {mobileSheetOpen ? (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filter inventory"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[55] md:hidden bg-charcoal/60 backdrop-blur-sm flex items-end"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setMobileSheetOpen(false);
                        }}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-h-[88vh] bg-white text-charcoal rounded-t-xl shadow-[0_-12px_40px_rgba(0,0,0,0.35)] flex flex-col"
                            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)' }}
                        >
                            <div className="px-5 pt-3 pb-4 sticky top-0 bg-white border-b border-charcoal/10 rounded-t-xl">
                                <div className="mx-auto w-12 h-1 rounded-full bg-charcoal/15 mb-3" />
                                <div className="flex items-center justify-between">
                                    <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-xl">
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileSheetOpen(false)}
                                        aria-label="Close filters"
                                        className="inline-flex items-center justify-center min-w-11 min-h-11 -mr-2 text-charcoal/65 hover:text-charcoal"
                                    >
                                        <X size={22} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-5 py-5 overscroll-contain">
                                <InventoryFilters
                                    tone="light"
                                    makes={makes}
                                    categories={categories}
                                    activeMakes={activeMakes}
                                    setActiveMakes={setActiveMakes}
                                    activeCategories={activeCategories}
                                    setActiveCategories={setActiveCategories}
                                    conditionFilter={conditionFilter}
                                    setConditionFilter={setConditionFilter}
                                    ranges={ranges}
                                    priceMax={priceMax}
                                    setPriceMax={setPriceMaxClamped}
                                    hpMin={hpMin}
                                    setHpMin={setHpMinClamped}
                                    yearMin={yearMin}
                                    setYearMin={setYearMinClamped}
                                />
                            </div>

                            <div className="px-5 py-4 border-t border-charcoal/10 grid grid-cols-2 gap-3 bg-white">
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="inline-flex items-center justify-center min-h-12 px-4 py-3 font-bold uppercase tracking-[0.2em] text-xs border border-charcoal/15 text-charcoal hover:border-brand-red hover:text-brand-red transition-colors"
                                >
                                    Clear all
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMobileSheetOpen(false)}
                                    className="inline-flex items-center justify-center min-h-12 px-4 py-3 font-bold uppercase tracking-[0.2em] text-xs bg-brand-red hover:bg-brand-red-dark text-white transition-colors"
                                >
                                    Show {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Grid */}
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                {filtered.length === 0 ? (
                    <div className="max-w-xl mx-auto text-center py-16 md:py-24">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4">
                            Nothing matches
                        </p>
                        <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-3xl md:text-4xl mb-4">
                            We do not have that on the lot.
                        </h2>
                        <p className="text-charcoal/60 leading-relaxed mb-8">
                            We can usually source it within a week. Text us what you are looking for
                            and we will track it down.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                type="button"
                                onClick={clearAll}
                                className="inline-flex items-center gap-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-6 py-3 min-h-12 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                            >
                                Reset filters
                            </button>
                            <a
                                href="sms://+13184429010"
                                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 min-h-12 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                            >
                                Text Us
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filtered.map((tractor, index) => {
                            const imgStr =
                                tractor['Image URL'] ||
                                tractor.image_url ||
                                tractor.images ||
                                tractor.image ||
                                tractor.photos ||
                                tractor['image url'];
                            let mainImageUrl = '';
                            if (imgStr && typeof imgStr === 'string' && imgStr.trim() !== '') {
                                const images = imgStr.split(/[\s,]+/).filter(Boolean);
                                if (images.length > 0) {
                                    mainImageUrl = processGoogleDriveUrl(images[0]);
                                }
                            }

                            const price = parsePriceNumber(tractor.price);
                            const monthly = price ? estimateMonthlyPayment(price).monthly : null;
                            const cond = getCondition(tractor);
                            const hp = getHorsepower(tractor);
                            const inCompare = compareIds.has(String(tractor.id));

                            return (
                                <motion.div
                                    key={tractor.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.35,
                                        delay: Math.min(index * 0.03, 0.3),
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="h-full flex flex-col group"
                                >
                                    <div className="relative h-full">
                                        <Link
                                            to={`/equipment/${tractor.id}`}
                                            className="bg-white overflow-hidden border border-charcoal/10 hover:border-charcoal/30 transition-colors flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                                        >
                                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                                                    <Settings size={36} />
                                                </div>
                                                {mainImageUrl ? (
                                                    <img
                                                        src={mainImageUrl}
                                                        alt={`${tractor.make || ''} ${tractor.model || ''}`}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                                                    />
                                                ) : null}
                                                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                                                    <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
                                                        {tractor.availability ||
                                                            (cond === 'used' ? 'Pre-Owned' : 'In Stock')}
                                                    </span>
                                                    {hp ? (
                                                        <span className="bg-charcoal/85 text-white text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
                                                            {hp} HP
                                                        </span>
                                                    ) : null}
                                                </div>
                                                {tractor.category ? (
                                                    <div className="absolute top-3 right-16">
                                                        <span className="bg-white/95 text-charcoal text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1">
                                                            {tractor.category}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {monthly ? (
                                                    <div className="absolute bottom-3 left-3 bg-white/95 text-charcoal px-3 py-1.5">
                                                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/55">
                                                            Est /mo
                                                        </p>
                                                        <p className="font-heading font-black tracking-tight text-base">
                                                            {formatMoney(monthly)}
                                                        </p>
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <p className="text-[11px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                    {tractor.make}
                                                </p>
                                                <h3 className="font-heading font-black text-charcoal uppercase tracking-tight text-2xl md:text-[26px] leading-tight mb-4 group-hover:text-brand-red transition-colors">
                                                    {tractor.model}
                                                </h3>

                                                <div className="mt-auto pt-5 border-t border-charcoal/10 flex items-end justify-between gap-3">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                            {price ? (isFallbackInventory ? 'Pricing' : 'Starting at') : 'Pricing'}
                                                        </p>
                                                        <p className="font-heading font-black text-charcoal text-lg md:text-xl tracking-tight">
                                                            {price ? formatMoney(price) : 'Contact for pricing'}
                                                        </p>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal group-hover:text-brand-red transition-colors">
                                                        Details
                                                        <ChevronRight
                                                            size={14}
                                                            className="group-hover:translate-x-1 transition-transform"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (!inCompare && !canAdd) return;
                                                toggleCompare(tractor);
                                            }}
                                            aria-pressed={inCompare}
                                            disabled={!inCompare && !canAdd}
                                            className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-2 min-h-10 text-[11px] font-bold uppercase tracking-[0.2em] border transition-colors ${
                                                inCompare
                                                    ? 'bg-brand-red text-white border-brand-red'
                                                    : 'bg-white text-charcoal border-charcoal/15 hover:border-brand-red hover:text-brand-red disabled:opacity-50 disabled:cursor-not-allowed'
                                            }`}
                                        >
                                            {inCompare ? <Scale size={12} /> : <Plus size={12} />}
                                            {inCompare ? 'Comparing' : 'Compare'}
                                        </button>

                                        <SaveButton item={tractor} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Inventory;
