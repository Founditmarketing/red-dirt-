import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Maximize2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useInventory } from '../context/InventoryContext';
import { processGoogleDriveUrl } from '../utils/imageFormat';
import {
    estimateMonthlyPayment,
    formatMoney,
    getCondition,
    getHorsepower,
    parsePriceNumber,
} from '../utils/inventoryDerive';
import SaveButton from './SaveButton';

type ChipKey = 'all' | 'tractor' | 'mower' | 'trailer' | 'new' | 'used' | 'under-30k';

const CHIPS: Array<{ key: ChipKey; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'tractor', label: 'Tractors' },
    { key: 'mower', label: 'Mowers' },
    { key: 'trailer', label: 'Trailers' },
    { key: 'new', label: 'New' },
    { key: 'used', label: 'Pre-Owned' },
    { key: 'under-30k', label: 'Under $30K' },
];

const matchesChip = (item: any, chip: ChipKey): boolean => {
    if (chip === 'all') return true;
    const cat = String(item.category || '').toLowerCase();
    const cond = getCondition(item);
    const price = parsePriceNumber(item.price) ?? Infinity;

    switch (chip) {
        case 'tractor':
            return /(tractor|compact|utility)/i.test(cat) ||
                /^(tym|mahindra|yanmar)/i.test(String(item.make || ''));
        case 'mower':
            return /(mow|zero[- ]turn|ferris)/.test(cat) ||
                /ferris/i.test(String(item.make || ''));
        case 'trailer':
            return /trailer/.test(cat);
        case 'new':
            return cond === 'new';
        case 'used':
            return cond === 'used';
        case 'under-30k':
            return price < 30000;
        default:
            return true;
    }
};

const InventoryGrid = () => {
    const { inventory, loading, isFallbackInventory } = useInventory();
    const [chip, setChip] = useState<ChipKey>('all');

    const filtered = useMemo(
        () => inventory.filter((item) => matchesChip(item, chip)),
        [inventory, chip],
    );

    const featured = filtered.slice(0, 4);
    const sectionEyebrow = isFallbackInventory ? 'Quote-ready equipment' : 'Now on the lot';

    if (loading) {
        return (
            <section
                id="inventory"
                className="bg-off-white py-16 md:py-32 relative text-center flex items-center justify-center min-h-[50vh]"
            >
                <div className="container mx-auto px-6">
                    <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm font-bold text-charcoal/50 uppercase tracking-widest">
                        Connecting to live inventory...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="inventory" className="bg-off-white py-16 md:py-28 relative">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-brand-red" />
                            <h3 className="text-brand-red font-bold tracking-[0.25em] uppercase text-xs md:text-sm">
                                {sectionEyebrow}
                            </h3>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-charcoal leading-none">
                            Featured <span className="text-brand-red">equipment</span>
                        </h2>
                        {isFallbackInventory ? (
                            <p className="mt-5 text-charcoal/60 font-medium leading-relaxed max-w-xl">
                                Live inventory is syncing. These are high-demand models our team can quote, source, and configure fast.
                            </p>
                        ) : null}
                    </motion.div>

                    <Link
                        to="/inventory"
                        className="group hidden md:inline-flex items-center justify-center gap-3 bg-brand-red text-white hover:bg-brand-red-dark px-7 py-4 transition-all shadow-lg hover:shadow-xl shrink-0"
                    >
                        <span className="font-black uppercase tracking-[0.2em] text-sm">
                            View all inventory
                        </span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Filter Chip Row */}
                <div className="-mx-4 md:mx-0 mb-8 md:mb-10 px-4 md:px-0">
                    <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-1 snap-x snap-mandatory">
                        {CHIPS.map((c) => {
                            const active = chip === c.key;
                            return (
                                <button
                                    key={c.key}
                                    type="button"
                                    onClick={() => setChip(c.key)}
                                    aria-pressed={active}
                                    className={`shrink-0 snap-start min-h-11 px-4 py-2 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] border transition-colors ${
                                        active
                                            ? 'bg-charcoal text-white border-charcoal'
                                            : 'bg-white text-charcoal/70 border-charcoal/15 hover:border-charcoal/40 hover:text-charcoal'
                                    }`}
                                >
                                    {c.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Featured Grid (4 items) */}
                {featured.length === 0 ? (
                    <div className="bg-white border border-charcoal/10 p-10 md:p-14 text-center">
                        <h3 className="font-heading font-black uppercase tracking-tight text-charcoal text-2xl md:text-3xl mb-3">
                            Nothing in this category yet.
                        </h3>
                        <p className="text-charcoal/60 font-medium leading-relaxed mb-6">
                            We can usually source it within a week. Tell us what you need.
                        </p>
                        <a
                            href="sms://+13184429010"
                            className="inline-flex items-center gap-2 bg-brand-red text-white px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-red-dark transition-colors"
                        >
                            Text Us
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        {featured.map((tractor, index) => {
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

                            return (
                                <motion.div
                                    key={tractor.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.5, delay: index * 0.06 }}
                                    className="h-full flex flex-col group"
                                >
                                    <div className="relative h-full">
                                        <Link
                                            to={`/equipment/${tractor.id}`}
                                            className="bg-white overflow-hidden border border-charcoal/10 shadow-sm hover:shadow-2xl hover:border-charcoal/30 transition-all duration-500 flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                                        >
                                            {/* Image */}
                                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal to-charcoal-light flex items-center justify-center opacity-50 z-0">
                                                    <Settings size={36} className="text-white/20" />
                                                </div>
                                                {mainImageUrl ? (
                                                    <img
                                                        src={mainImageUrl}
                                                        alt={`${tractor.make || ''} ${tractor.model || ''}`}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="absolute inset-0 w-full h-full object-cover z-10 scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                                    />
                                                ) : null}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-20 pointer-events-none" />

                                                <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 items-start">
                                                    <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 shadow-md">
                                                        {tractor.availability ||
                                                            (cond === 'used' ? 'Pre-Owned' : 'In Stock')}
                                                    </span>
                                                    {hp ? (
                                                        <span className="bg-charcoal/90 text-white text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
                                                            {hp} HP
                                                        </span>
                                                    ) : null}
                                                </div>

                                                {monthly ? (
                                                    <div className="absolute bottom-3 left-3 z-30 bg-white/95 text-charcoal px-3 py-1.5">
                                                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/55">
                                                            From
                                                        </p>
                                                        <p className="font-heading font-black tracking-tight text-base leading-none">
                                                            {formatMoney(monthly)}
                                                            <span className="text-[10px] text-charcoal/55 font-medium">/mo</span>
                                                        </p>
                                                    </div>
                                                ) : null}

                                                <div className="absolute bottom-3 right-3 z-30 bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Maximize2 size={14} className="text-white" />
                                                </div>
                                            </div>

                                            {/* Card body */}
                                            <div className="p-5 md:p-6 flex flex-col flex-grow bg-white">
                                                <p className="text-[11px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                    {tractor.make}
                                                </p>
                                                <h3 className="font-heading font-black text-charcoal uppercase tracking-tight text-xl md:text-2xl leading-tight mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                                                    {tractor.model}
                                                </h3>

                                                {tractor.category ? (
                                                    <p className="text-[11px] text-charcoal/55 font-medium mb-4">
                                                        {tractor.category}
                                                    </p>
                                                ) : null}

                                                <div className="mt-auto pt-4 border-t border-charcoal/10 flex items-end justify-between gap-3">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                            {price ? 'Starting at' : 'Pricing'}
                                                        </p>
                                                        <p className="font-heading font-black text-charcoal text-lg tracking-tight">
                                                            {price ? formatMoney(price) : 'Contact for pricing'}
                                                        </p>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal group-hover:text-brand-red transition-colors">
                                                        Details
                                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <SaveButton item={tractor} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                <Link
                    to="/inventory"
                    className="md:hidden mt-8 inline-flex w-full items-center justify-center gap-3 bg-brand-red text-white hover:bg-brand-red-dark px-7 py-4 min-h-12 transition-all"
                >
                    <span className="font-black uppercase tracking-[0.2em] text-sm">
                        View all inventory
                    </span>
                    <ChevronRight size={18} />
                </Link>
            </div>
        </section>
    );
};

export default InventoryGrid;
