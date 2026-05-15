import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { useInventory } from '../context/InventoryContext';
import { processGoogleDriveUrl } from '../utils/imageFormat';
import { parsePriceNumber, formatMoney, getCondition } from '../utils/inventoryDerive';

/** Scrolling marquee of featured products — mixes tractors, mowers, construction, etc. */
const FeaturedMarquee = () => {
    const { inventory, loading } = useInventory();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    // Pick a diverse mix of product types (up to 12 items)
    const featured = pickDiverseMix(inventory, 12);

    if (loading || featured.length === 0) return null;

    // Double for infinite scroll illusion
    const items = [...featured, ...featured];

    return (
        <section ref={ref} className="bg-off-white py-10 md:py-14 overflow-hidden border-b border-charcoal/10">
            <div className="container mx-auto px-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-brand-red" />
                        <h3 className="text-brand-red font-bold tracking-[0.25em] uppercase text-xs md:text-sm">
                            Featured equipment
                        </h3>
                    </div>
                    <Link
                        to="/inventory"
                        className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                    >
                        View all
                        <ArrowUpRight size={14} />
                    </Link>
                </motion.div>
            </div>

            {/* Scrolling track */}
            <div className="relative">
                <motion.div
                    className="flex gap-5 w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: featured.length * 4,
                            ease: 'linear',
                        },
                    }}
                >
                    {items.map((item, i) => (
                        <MarqueeCard key={`${item.id}-${i}`} item={item} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

/* ── Card for the marquee ─────────────────────────────── */
const MarqueeCard = ({ item }: { item: any }) => {
    const imgStr =
        item['Image URL'] || item.image_url || item.images || item.image || item.photos || item['image url'];
    let mainImageUrl = '';
    if (imgStr && typeof imgStr === 'string' && imgStr.trim() !== '') {
        const images = imgStr.split(/[\s,]+/).filter(Boolean);
        if (images.length > 0) mainImageUrl = processGoogleDriveUrl(images[0]);
    }

    const price = parsePriceNumber(item.price);
    const cond = getCondition(item);

    return (
        <Link
            to={`/equipment/${item.id}`}
            className="group flex-shrink-0 w-[260px] sm:w-[300px] bg-white border border-charcoal/10 overflow-hidden hover:border-charcoal/30 hover:shadow-xl transition-all duration-500"
        >
            <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
                {mainImageUrl ? (
                    <img
                        src={mainImageUrl}
                        alt={`${item.make || ''} ${item.model || ''}`}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-bold uppercase tracking-widest">
                        No Image
                    </div>
                )}
                <span className="absolute top-2 left-2 bg-brand-red text-white text-[9px] font-bold uppercase tracking-[0.25em] px-2 py-0.5 shadow">
                    {cond === 'used' ? 'Pre-Owned' : 'In Stock'}
                </span>
            </div>
            <div className="p-4">
                <p className="text-[10px] font-bold text-charcoal/50 uppercase tracking-[0.25em] mb-1">
                    {item.make}
                </p>
                <h4 className="font-heading font-black text-charcoal uppercase tracking-tight text-base leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-1">
                    {item.model}
                </h4>
                <p className="font-heading font-black text-charcoal text-sm tracking-tight">
                    {price ? formatMoney(price) : 'Contact for pricing'}
                </p>
            </div>
        </Link>
    );
};

/* ── Pick a diverse product mix ───────────────────────── */
function pickDiverseMix(inventory: any[], count: number) {
    if (inventory.length === 0) return [];

    const buckets: Record<string, any[]> = {
        tractor: [],
        mower: [],
        construction: [],
        trailer: [],
        other: [],
    };

    for (const item of inventory) {
        const cat = String(item.category || '').toLowerCase();
        const make = String(item.make || '').toLowerCase();
        if (/(tractor|compact|utility)/i.test(cat) || /^(tym|mahindra|yanmar)/i.test(make)) {
            buckets.tractor.push(item);
        } else if (/(mow|zero[- ]turn|ferris)/i.test(cat) || /ferris/i.test(make)) {
            buckets.mower.push(item);
        } else if (/(construction|wacker|excavat|loader|skid)/i.test(cat) || /wacker/i.test(make)) {
            buckets.construction.push(item);
        } else if (/trailer/i.test(cat)) {
            buckets.trailer.push(item);
        } else {
            buckets.other.push(item);
        }
    }

    // Round-robin from each bucket
    const result: any[] = [];
    const keys = Object.keys(buckets);
    let idx = 0;
    while (result.length < count) {
        const bucket = buckets[keys[idx % keys.length]];
        const item = bucket.shift();
        if (item) result.push(item);
        idx++;
        // Safety: if all buckets empty, stop
        if (keys.every((k) => buckets[k].length === 0) && result.length < count) break;
    }

    return result;
}

export default FeaturedMarquee;
