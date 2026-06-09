import { ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { LiveInventoryItem } from '../../context/InventoryContext';
import { processGoogleDriveUrl } from '../../utils/imageFormat';
import {
    estimateMonthlyPayment,
    formatMoney,
    getCondition,
    getHorsepower,
    parsePriceNumber,
} from '../../utils/inventoryDerive';
import SaveButton from '../SaveButton';

const pickImage = (item: any): string | undefined => {
    const fields = ['Image URL', 'image_url', 'images', 'image', 'photos', 'image url'];
    for (const key of fields) {
        const value = item?.[key];
        if (typeof value === 'string' && value.trim() !== '') {
            const first = value.split(/[\s,]+/).filter(Boolean)[0];
            if (first) return processGoogleDriveUrl(first);
        }
    }
    return undefined;
};

type Props = {
    currentId: string | number;
    currentMake?: string;
    currentCategory?: string;
    inventory: LiveInventoryItem[];
};

const AlsoViewed = ({ currentId, currentMake, currentCategory, inventory }: Props) => {
    const sameMake = inventory.filter(
        (it) => String(it.id) !== String(currentId) && (it.make || '').toLowerCase() === (currentMake || '').toLowerCase(),
    );
    const sameCategory = inventory.filter(
        (it) =>
            String(it.id) !== String(currentId) &&
            (it.category || '').toLowerCase() === (currentCategory || '').toLowerCase() &&
            !sameMake.find((s) => String(s.id) === String(it.id)),
    );
    const fallback = inventory.filter(
        (it) =>
            String(it.id) !== String(currentId) &&
            !sameMake.find((s) => String(s.id) === String(it.id)) &&
            !sameCategory.find((s) => String(s.id) === String(it.id)),
    );
    const picks = [...sameMake, ...sameCategory, ...fallback].slice(0, 6);

    if (picks.length === 0) return null;

    return (
        <section className="mt-16 md:mt-24 pt-10 md:pt-14 border-t border-charcoal/10">
            <div className="flex items-end justify-between mb-6 md:mb-8">
                <div>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-3">
                        Customers also looked at
                    </p>
                    <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-2xl md:text-4xl">
                        Other equipment, in stock.
                    </h2>
                </div>
                <Link
                    to="/inventory"
                    className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                >
                    Browse all
                    <ChevronRight size={16} />
                </Link>
            </div>

            <div className="-mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                <ul className="flex gap-4 md:grid md:grid-cols-3 md:gap-6">
                    {picks.map((item) => {
                        const img = pickImage(item);
                        const price = parsePriceNumber(item.price);
                        const monthly = price ? estimateMonthlyPayment(price).monthly : null;
                        const cond = getCondition(item);
                        const hp = getHorsepower(item);
                        return (
                            <li
                                key={item.id}
                                className="snap-start shrink-0 w-[78%] sm:w-[60%] md:w-auto"
                            >
                                <div className="relative h-full">
                                    <Link
                                        to={`/equipment/${item.id}`}
                                        className="bg-white border border-charcoal/10 hover:border-charcoal/30 transition-colors overflow-hidden flex flex-col h-full group"
                                    >
                                        <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center text-white/30">
                                                <Settings size={28} />
                                            </div>
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt={`${item.make || ''} ${item.model || ''}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : null}
                                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                                                <span className="bg-brand-red text-white text-[9px] font-bold uppercase tracking-[0.25em] px-2 py-0.5">
                                                    {cond === 'used' ? 'Pre-Owned' : 'In Stock'}
                                                </span>
                                                {hp ? (
                                                    <span className="bg-charcoal/85 text-white text-[9px] font-bold uppercase tracking-[0.25em] px-2 py-0.5">
                                                        {hp} HP
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="p-4 md:p-5 flex flex-col flex-grow">
                                            <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                {item.make}
                                            </p>
                                            <h3 className="font-heading font-black text-charcoal uppercase tracking-tight text-base md:text-lg leading-tight mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                                                {item.model}
                                            </h3>
                                            <div className="mt-auto pt-3 border-t border-charcoal/10 flex items-end justify-between gap-2">
                                                <p className="font-heading font-black text-charcoal text-base">
                                                    {price ? formatMoney(price) : item.price || 'Call'}
                                                </p>
                                                {monthly ? (
                                                    <p className="text-[10px] text-charcoal/55 font-medium">
                                                        {formatMoney(monthly)}/mo
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </Link>
                                    <SaveButton item={item} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default AlsoViewed;
