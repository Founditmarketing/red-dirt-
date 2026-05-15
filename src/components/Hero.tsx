import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import ResponsivePicture from './ResponsivePicture';

/* ── Animated counter hook ─────────────────────────────── */
const useCounter = (target: number, duration = 2000, start = false) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let raf: number;
        const t0 = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - t0) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);
    return value;
};

/* ── Horsepower constants (placeholder — client will provide actuals) ── */
const TOTAL_HP_SOLD = 962_400;
const DOORS_OPENED = new Date('2016-01-01');
const daysSinceOpening = () =>
    Math.floor((Date.now() - DOORS_OPENED.getTime()) / 86_400_000);
const HP_PER_DAY = Math.round(TOTAL_HP_SOLD / daysSinceOpening());

const HERO_WIDTHS = [640, 960, 1440, 1920];
const HERO_SIZES = '100vw';

const Hero = () => {
    return (
        <section
            className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-end bg-charcoal"
        >
            {/* Background Media: cinematic still with subtle Ken Burns motion */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1.15 }}
                    transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute inset-0 w-full h-full"
                    aria-hidden
                >
                    <ResponsivePicture
                        base="/tractors/12"
                        fallback="/tractors/12.jpg"
                        widths={HERO_WIDTHS}
                        sizes={HERO_SIZES}
                        alt=""
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="absolute inset-0 w-full h-full"
                        imgClassName="absolute inset-0 w-full h-full object-cover"
                    />
                </motion.div>
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-charcoal/30"
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent"
                />
            </div>

            {/* Content */}
            <div
                className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 text-white pt-28 md:pt-32 w-full"
                style={{
                    paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 4rem)',
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-8 max-w-4xl"
                    >
                        <p className="text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4 md:mb-6">
                            Central Louisiana&rsquo;s heavy iron dealer
                        </p>

                        <h1 className="font-heading font-black uppercase leading-[0.92] sm:leading-[0.88] tracking-tight text-[clamp(2.5rem,7.5vw,6.5rem)]">
                            Move the Earth.
                            <br />
                            Master the <span className="text-brand-red">Land.</span>
                        </h1>

                        <p className="mt-6 md:mt-7 text-base md:text-lg text-white/80 max-w-xl font-medium leading-relaxed">
                            Headquarters for heavy-duty construction equipment, premium
                            tractors, and the attachments to get the job done right.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
                            <Link
                                to="/inventory"
                                className="group inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark active:scale-[0.98] text-white px-7 py-4 min-h-12 font-bold uppercase tracking-[0.2em] text-sm transition-all"
                            >
                                Browse Inventory
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <a
                                href="tel:3184429010"
                                className="inline-flex items-center justify-center gap-3 border border-white/30 text-white hover:bg-white hover:text-charcoal active:scale-[0.98] px-7 py-4 min-h-12 font-bold uppercase tracking-[0.2em] text-sm transition-all"
                            >
                                <Phone size={16} />
                                318.442.9010
                            </a>
                        </div>
                    </motion.div>

                    <HeroStats />
                </div>
            </div>

            {/* Scroll indicator (desktop only — mobile is too cramped) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ delay: 1.2, duration: 2.4, repeat: Infinity }}
                style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
                className="hidden md:flex absolute right-10 text-white/50 items-center gap-3 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                    Scroll
                </span>
                <div className="w-12 h-px bg-white/40" />
            </motion.div>
        </section>
    );
};

const HeroStats = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const hpTotal = useCounter(TOTAL_HP_SOLD, 2400, inView);
    const hpDay = useCounter(HP_PER_DAY, 1800, inView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-4 lg:pl-10 lg:border-l lg:border-white/10"
        >
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 text-white">
                <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45 mb-2">
                        Established
                    </dt>
                    <dd className="font-heading font-black tracking-tighter text-4xl xl:text-5xl leading-none">
                        2014
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45 mb-2">
                        Delivered
                    </dt>
                    <dd className="font-heading font-black tracking-tighter text-4xl xl:text-5xl leading-none">
                        4,000+
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red/80 mb-2">
                        Total HP Sold
                    </dt>
                    <dd className="font-heading font-black tracking-tighter text-3xl xl:text-4xl leading-none tabular-nums">
                        {hpTotal.toLocaleString()}
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red/80 mb-2">
                        HP / Day
                    </dt>
                    <dd className="font-heading font-black tracking-tighter text-3xl xl:text-4xl leading-none tabular-nums">
                        {hpDay.toLocaleString()}
                    </dd>
                </div>
            </dl>
        </motion.div>
    );
};

export default Hero;
