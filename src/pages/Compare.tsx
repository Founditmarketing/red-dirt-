import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCompare } from '../context/CompareContext';
import { processGoogleDriveUrl } from '../utils/imageFormat';
import {
    estimateMonthlyPayment,
    formatMoney,
    getCondition,
    getHorsepower,
    getHours,
    getYear,
    parsePriceNumber,
} from '../utils/inventoryDerive';

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

const Compare = () => {
    const { items, remove, clear } = useCompare();

    const enriched = useMemo(
        () =>
            items.map((item) => {
                const price = parsePriceNumber(item.price);
                const monthly = price ? estimateMonthlyPayment(price).monthly : null;
                return {
                    item,
                    image: pickImage(item),
                    price,
                    monthly,
                    horsepower: getHorsepower(item),
                    year: getYear(item),
                    hours: getHours(item),
                    condition: getCondition(item),
                };
            }),
        [items],
    );

    return (
        <>
            <Helmet>
                <title>Compare Equipment | Red Dirt Tractors</title>
                <meta
                    name="description"
                    content="Side-by-side comparison of up to three tractors or pieces of equipment from Red Dirt Tractors inventory."
                />
                <link rel="canonical" href="https://reddirt-tractors.com/compare" />
            </Helmet>

            <section className="pt-28 md:pt-36 pb-10 md:pb-12 bg-off-white">
                <div className="container mx-auto px-6">
                    <Link
                        to="/inventory"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-charcoal/55 hover:text-brand-red transition-colors mb-6"
                    >
                        <ChevronLeft size={14} />
                        Back to inventory
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4">
                                Compare
                            </p>
                            <h1 className="font-heading font-black uppercase text-charcoal leading-[0.92] tracking-tight text-4xl md:text-6xl">
                                Side by side.
                            </h1>
                        </div>
                        {items.length > 0 ? (
                            <button
                                type="button"
                                onClick={clear}
                                className="inline-flex items-center gap-2 border border-charcoal/20 hover:border-brand-red hover:text-brand-red px-5 py-2.5 font-bold uppercase tracking-[0.2em] text-xs text-charcoal transition-colors self-start"
                            >
                                Clear all
                            </button>
                        ) : null}
                    </div>
                </div>
            </section>

            {items.length === 0 ? (
                <section className="pb-24 bg-off-white">
                    <div className="container mx-auto px-6">
                        <div className="bg-white border border-charcoal/10 p-10 md:p-14 text-center max-w-2xl mx-auto">
                            <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-2xl md:text-3xl mb-3">
                                Nothing to compare yet.
                            </h2>
                            <p className="text-charcoal/65 font-medium leading-relaxed mb-7">
                                Pick up to three units from the inventory page using the Compare
                                button on each card. We will line them up here with specs, hours,
                                and estimated payments.
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
                        <div className="overflow-x-auto -mx-6 px-6 pb-2">
                            <div
                                className="grid gap-5 md:gap-6 min-w-[640px]"
                                style={{
                                    gridTemplateColumns: `repeat(${enriched.length}, minmax(220px, 1fr))`,
                                }}
                            >
                                {enriched.map(
                                    ({ item, image, price, monthly, horsepower, year, hours, condition }) => (
                                        <article
                                            key={item.id}
                                            className="bg-white border border-charcoal/10 flex flex-col"
                                        >
                                            <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={`${item.make || ''} ${item.model || ''}`}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                ) : null}
                                                <button
                                                    type="button"
                                                    onClick={() => remove(item.id)}
                                                    className="absolute top-3 right-3 bg-black/60 hover:bg-brand-red text-white w-8 h-8 inline-flex items-center justify-center"
                                                    aria-label="Remove from compare"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                            <div className="p-5 flex flex-col gap-4 flex-grow">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-1">
                                                        {item.make}
                                                    </p>
                                                    <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-xl">
                                                        {item.model}
                                                    </h2>
                                                </div>

                                                <dl className="grid grid-cols-2 gap-y-3 text-sm">
                                                    <Spec label="Price" value={price ? formatMoney(price) : item.price || 'Call'} />
                                                    <Spec label="Est /mo" value={monthly ? formatMoney(monthly) : 'Call'} />
                                                    <Spec label="Year" value={year ?? 'n/a'} />
                                                    <Spec label="Hours" value={hours ?? 'n/a'} />
                                                    <Spec label="HP" value={horsepower ?? 'n/a'} />
                                                    <Spec
                                                        label="Condition"
                                                        value={
                                                            condition === 'unknown'
                                                                ? 'n/a'
                                                                : condition.replace(/^./, (c) => c.toUpperCase())
                                                        }
                                                    />
                                                </dl>

                                                <Link
                                                    to={`/equipment/${item.id}`}
                                                    className="mt-auto inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-brand-red text-white px-4 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                                >
                                                    View details
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </article>
                                    ),
                                )}
                            </div>
                        </div>
                        <p className="mt-6 text-xs text-charcoal/50 font-medium leading-relaxed max-w-xl">
                            Estimated monthly assumes 84 months at 7.99% APR with 10% down.
                            Final terms come from your lender.
                        </p>
                    </div>
                </section>
            )}
        </>
    );
};

const Spec = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div>
        <dt className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-1">
            {label}
        </dt>
        <dd className="font-bold text-charcoal text-sm">{value}</dd>
    </div>
);

export default Compare;
