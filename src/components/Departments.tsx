import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import ResponsivePicture from './ResponsivePicture';

interface Tile {
    to: string;
    eyebrow: string;
    title: string;
    body: string;
    image: string;
}

const featured: Tile = {
    to: '/inventory',
    eyebrow: 'Live inventory',
    title: 'On the lot today.',
    body: 'TYM, Mahindra, Yanmar, Ferris. Compact utility through 100+ HP. Updated daily from our floor.',
    image: '/tractors/12.jpg',
};

const secondary: Tile[] = [
    {
        to: '/parts-service',
        eyebrow: 'Service',
        title: 'Parts & Service',
        body: 'Field dispatch, in-shop repair, and a parts counter that actually has the part.',
        image: '/hero_parts_service.png',
    },
    {
        to: '/financing',
        eyebrow: 'Finance',
        title: 'Financing',
        body: 'Mahindra Finance, DLL, Sheffield, Synchrony, Vibrant. Apply in five minutes.',
        image: '/tractors/7.jpg',
    },
    {
        to: '/implements',
        eyebrow: 'Add-ons',
        title: 'Implements & Trailers',
        body: 'Full line of attachments, implements, and trailers from our short-line partners.',
        image: '/rendition-14.jpeg',
    },
];

const Departments = () => {
    return (
        <section className="py-20 md:py-32 bg-off-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
                    <div className="max-w-xl">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4">
                            Where to start
                        </p>
                        <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
                            Four ways
                            <br />
                            to get to work.
                        </h2>
                    </div>
                    <p className="text-charcoal/60 font-medium max-w-sm md:text-right">
                        Whatever brought you in, there is a person on our team whose
                        job it is to handle exactly that.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
                    {/* Featured */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7"
                    >
                        <Link
                            to={featured.to}
                            className="relative block group overflow-hidden bg-charcoal aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[460px]"
                        >
                            <ResponsivePicture
                                base="/tractors/12"
                                fallback={featured.image}
                                widths={[640, 960, 1440]}
                                sizes="(min-width: 1024px) 60vw, 100vw"
                                alt=""
                                loading="lazy"
                                className="absolute inset-0 w-full h-full"
                                imgClassName="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                            />
                            <div
                                aria-hidden
                                className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/5"
                            />
                            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 md:p-12 text-white">
                                <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4 md:mb-5">
                                    {featured.eyebrow}
                                </p>
                                <h3 className="font-heading font-black uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-4 md:mb-5 max-w-md">
                                    {featured.title}
                                </h3>
                                <p className="text-sm sm:text-base text-white/80 font-medium max-w-md leading-relaxed mb-6 md:mb-7 line-clamp-3 sm:line-clamp-none">
                                    {featured.body}
                                </p>
                                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
                                    Browse Inventory
                                    <ArrowUpRight
                                        size={18}
                                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    />
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Secondary stack */}
                    <div className="lg:col-span-5 grid grid-cols-1 gap-5 md:gap-6">
                        {secondary.map((tile, i) => (
                            <motion.div
                                key={tile.to}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + i * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <Link
                                    to={tile.to}
                                    className="relative grid grid-cols-5 group overflow-hidden bg-white border border-charcoal/10 hover:border-charcoal/30 transition-colors h-full min-h-[140px]"
                                >
                                    <div className="col-span-2 relative bg-charcoal overflow-hidden">
                                        <img
                                            src={tile.image}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />
                                    </div>
                                    <div className="col-span-3 p-5 md:p-6 flex flex-col justify-center">
                                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-red mb-2">
                                            {tile.eyebrow}
                                        </p>
                                        <h3 className="font-heading font-black uppercase tracking-tight text-charcoal text-lg md:text-xl mb-2 leading-tight">
                                            {tile.title}
                                        </h3>
                                        <p className="text-charcoal/60 text-xs md:text-sm leading-relaxed mb-3 line-clamp-2">
                                            {tile.body}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal group-hover:text-brand-red transition-colors">
                                            Open
                                            <ArrowUpRight
                                                size={14}
                                                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                            />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-14 md:mt-16 pt-10 border-t border-charcoal/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-charcoal/40 max-w-md">
                        Still browsing?
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        <Link
                            to="/about"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                        >
                            Our story -&gt;
                        </Link>
                        <Link
                            to="/reviews"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                        >
                            Customer reviews -&gt;
                        </Link>
                        <Link
                            to="/trade-in"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                        >
                            Trade-in value -&gt;
                        </Link>
                        <Link
                            to="/resources"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                        >
                            Buying guides -&gt;
                        </Link>
                        <Link
                            to="/contact"
                            className="text-sm font-bold uppercase tracking-[0.2em] text-charcoal hover:text-brand-red transition-colors"
                        >
                            Hours &amp; directions -&gt;
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Departments;
