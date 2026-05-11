import { Helmet } from 'react-helmet-async';
import { ArrowRight, Heart, Settings, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useInventory } from '../context/InventoryContext';
import { useSaved } from '../context/SavedContext';
import { processGoogleDriveUrl } from '../utils/imageFormat';
import {
    estimateMonthlyPayment,
    formatMoney,
    getCondition,
    getHorsepower,
    parsePriceNumber,
} from '../utils/inventoryDerive';
import SaveButton from '../components/SaveButton';

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

const Saved = () => {
    const { inventory, loading } = useInventory();
    const { items: filterSaved, count, clear } = useSaved();
    const saved = filterSaved(inventory);

    return (
        <>
            <Helmet>
                <title>Saved Equipment | Red Dirt Tractors</title>
                <meta
                    name="description"
                    content="Equipment you have saved for follow up at Red Dirt Tractors."
                />
                <meta name="robots" content="noindex" />
            </Helmet>

            <section className="pt-28 md:pt-36 pb-10 md:pb-12 bg-off-white">
                <div className="container mx-auto px-6">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-5">
                        Your saved equipment
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="font-heading font-black uppercase text-charcoal leading-[0.92] tracking-tight text-4xl sm:text-5xl md:text-7xl">
                            {count > 0 ? `${count} unit${count === 1 ? '' : 's'}` : 'Nothing saved yet.'}
                            {count > 0 ? (
                                <>
                                    <br />
                                    <span className="text-brand-red">on your shortlist.</span>
                                </>
                            ) : null}
                        </h1>
                        {count > 0 ? (
                            <button
                                type="button"
                                onClick={clear}
                                className="inline-flex items-center gap-2 border border-charcoal/20 hover:border-brand-red hover:text-brand-red px-5 py-3 min-h-12 font-bold uppercase tracking-[0.2em] text-xs text-charcoal transition-colors self-start"
                            >
                                <Trash2 size={14} />
                                Clear all
                            </button>
                        ) : null}
                    </div>
                </div>
            </section>

            {count === 0 || (loading && saved.length === 0) ? (
                <section className="pb-24 bg-off-white">
                    <div className="container mx-auto px-6">
                        <div className="bg-white border border-charcoal/10 p-10 md:p-14 text-center max-w-2xl mx-auto">
                            <Heart size={36} className="text-brand-red mx-auto mb-5" />
                            <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-2xl md:text-3xl mb-3">
                                Build your shortlist.
                            </h2>
                            <p className="text-charcoal/65 font-medium leading-relaxed mb-7">
                                Tap the heart on any tractor or piece of equipment to save it here.
                                Your shortlist stays on this device, no account needed.
                            </p>
                            <Link
                                to="/inventory"
                                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                            >
                                Browse inventory
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="pb-24 bg-off-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {saved.map((item) => {
                                const img = pickImage(item);
                                const price = parsePriceNumber(item.price);
                                const monthly = price ? estimateMonthlyPayment(price).monthly : null;
                                const cond = getCondition(item);
                                const hp = getHorsepower(item);

                                return (
                                    <div key={item.id} className="relative h-full flex flex-col">
                                        <Link
                                            to={`/equipment/${item.id}`}
                                            className="bg-white overflow-hidden border border-charcoal/10 hover:border-charcoal/30 transition-colors flex flex-col h-full"
                                        >
                                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                                                    <Settings size={36} />
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
                                                    <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
                                                        {cond === 'used' ? 'Pre-Owned' : 'In Stock'}
                                                    </span>
                                                    {hp ? (
                                                        <span className="bg-charcoal/85 text-white text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1">
                                                            {hp} HP
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <p className="text-[11px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                    {item.make}
                                                </p>
                                                <h3 className="font-heading font-black text-charcoal uppercase tracking-tight text-2xl mb-4">
                                                    {item.model}
                                                </h3>
                                                <div className="mt-auto pt-5 border-t border-charcoal/10 flex items-end justify-between gap-3">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                            Starting at
                                                        </p>
                                                        <p className="font-heading font-black text-charcoal text-lg tracking-tight">
                                                            {price ? formatMoney(price) : item.price || 'Call us'}
                                                        </p>
                                                    </div>
                                                    {monthly ? (
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                                                                Est /mo
                                                            </p>
                                                            <p className="font-heading font-black text-brand-red text-base tracking-tight">
                                                                {formatMoney(monthly)}
                                                            </p>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </Link>
                                        <SaveButton item={item} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Saved;
