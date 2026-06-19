import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Maximize2, MessageSquare, Phone, X } from 'lucide-react';

const implements_gallery = [
    { src: '/rendition-3.jpeg', alt: 'Implement' },
    { src: '/rendition-4.jpeg', alt: 'Implement' },
    { src: '/rendition-5.jpeg', alt: 'Implement' },
    { src: '/rendition-6.jpeg', alt: 'Implement' },
    { src: '/rendition-7.jpeg', alt: 'Implement' },
    { src: '/rendition-8.jpeg', alt: 'Implement' },
    { src: '/rendition-10-scaled.jpeg', alt: 'Implement' },
    { src: '/rendition-12.jpeg', alt: 'Implement' },
    { src: '/rendition-13-1.jpeg', alt: 'Implement' },
    { src: '/rendition-14.jpeg', alt: 'Implement' },
];

const Implements = () => {
    const total = implements_gallery.length;
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const isOpen = lightboxIndex !== null;

    const close = useCallback(() => setLightboxIndex(null), []);
    const prev = useCallback(
        () => setLightboxIndex((i) => (i === null ? i : (i - 1 + total) % total)),
        [total],
    );
    const next = useCallback(
        () => setLightboxIndex((i) => (i === null ? i : (i + 1) % total)),
        [total],
    );

    // Keyboard: Esc closes, arrows navigate.
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, close, prev, next]);

    // Lock body scroll while the lightbox is open.
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    const active = isOpen ? implements_gallery[lightboxIndex] : null;

    return (
        <div className="min-h-screen bg-off-white">
            <Helmet>
                <title>Implements &amp; Attachments | Red Dirt Tractors in Alexandria, LA</title>
                <meta
                    name="description"
                    content="Bush hogs, box blades, augers, grapples, pallet forks, post hole diggers, and more. Quality implements and attachments in stock at Red Dirt Tractors on Hwy 71 South in Alexandria, LA."
                />
                <link rel="canonical" href="https://reddirt-tractors.com/implements" />
            </Helmet>

            {/* Hero Header */}
            <section className="relative h-[45vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden pt-20 md:pt-28">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-brand-red/20 z-10" />
                    <img src="/rendition-14.jpeg" alt="Implements" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-brand-red"></span>
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Attachments & More</h3>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 md:mb-6 leading-none">
                            Implements<span className="text-brand-red">.</span>
                        </h1>
                        <p className="text-base md:text-xl text-white/75 font-medium max-w-2xl leading-relaxed">
                            Complete your setup with our full range of quality implements, attachments, and accessories in stock and ready to go.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {implements_gallery.map((item, index) => (
                        <motion.button
                            key={index}
                            type="button"
                            onClick={() => setLightboxIndex(index)}
                            aria-label={`View implement photo ${index + 1} of ${total}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="group block w-full text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-off-white rounded-sm"
                        >
                            <div className="bg-white rounded-sm overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <span className="absolute bottom-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/25 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                                        <Maximize2 size={16} />
                                    </span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-charcoal py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-none">
                            Need a <span className="text-brand-red">Package Deal?</span>
                        </h2>
                        <p className="text-white/60 font-medium max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
                            Bundle your equipment purchase with implements, attachments, or a trailer. We offer package deals that can be included in our financing specials.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:3184429010" className="group inline-flex items-center justify-center gap-3 bg-brand-red text-white hover:bg-brand-red-dark px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl">
                                <Phone size={18} />
                                <span>Call 318-442-9010</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="sms://+13184429010" className="group inline-flex items-center justify-center gap-3 bg-white/10 text-white hover:bg-white/20 px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all border border-white/20">
                                <span>Text Us</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Image lightbox */}
            <AnimatePresence>
                {isOpen && active ? (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Implement photo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                        className="fixed inset-0 z-[70] bg-charcoal/95 backdrop-blur-sm flex flex-col"
                        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
                    >
                        {/* Top bar: counter + close */}
                        <div className="flex items-center justify-between px-5 py-4 shrink-0">
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/55">
                                {(lightboxIndex ?? 0) + 1} / {total}
                            </span>
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close"
                                className="inline-flex items-center justify-center min-w-11 min-h-11 -mr-2 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={26} />
                            </button>
                        </div>

                        {/* Image stage with prev/next */}
                        <div className="flex-1 min-h-0 flex items-center justify-center gap-2 md:gap-4 px-3 md:px-6">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prev();
                                }}
                                aria-label="Previous photo"
                                className="shrink-0 inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <motion.img
                                key={lightboxIndex}
                                src={active.src}
                                alt={active.alt}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                onClick={(e) => e.stopPropagation()}
                                className="max-h-full max-w-full object-contain rounded-sm shadow-2xl"
                            />

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    next();
                                }}
                                aria-label="Next photo"
                                className="shrink-0 inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Minimal info + reach-out CTA */}
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="shrink-0 px-5 pt-5 text-center"
                            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 1.5rem)' }}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red mb-2">
                                Implements &amp; Attachments
                            </p>
                            <p className="text-white/70 font-medium text-sm md:text-base max-w-md mx-auto mb-5 leading-relaxed">
                                Like the look of this one? Call or text and we&rsquo;ll get you the
                                details, pricing, and availability.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href="tel:3184429010"
                                    className="group inline-flex items-center justify-center gap-3 bg-brand-red text-white hover:bg-brand-red-dark px-7 py-3.5 min-h-12 rounded-sm font-bold uppercase tracking-[0.2em] text-xs md:text-sm transition-colors shadow-xl"
                                >
                                    <Phone size={18} />
                                    <span>Call 318-442-9010</span>
                                </a>
                                <a
                                    href="sms://+13184429010"
                                    className="inline-flex items-center justify-center gap-3 bg-white/10 text-white hover:bg-white/20 px-7 py-3.5 min-h-12 rounded-sm font-bold uppercase tracking-[0.2em] text-xs md:text-sm border border-white/20 transition-colors"
                                >
                                    <MessageSquare size={18} />
                                    <span>Text Us</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default Implements;
