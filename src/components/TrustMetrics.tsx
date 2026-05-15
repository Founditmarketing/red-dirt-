import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Animated counter hook ─────────────────────────────── */
const useCounter = (target: number, duration = 2000, start = false) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let raf: number;
        const t0 = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - t0) / duration, 1);
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

const TrustMetrics = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const hpTotal = useCounter(TOTAL_HP_SOLD, 2400, inView);
    const hpDay = useCounter(HP_PER_DAY, 1800, inView);

    return (
        <section ref={ref} className="bg-brand-red text-white py-20 relative overflow-hidden">
             {/* Abstract Mechanical Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-5 text-center md:divide-x divide-white/20">
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="pb-8 md:pb-0 border-b border-r md:border-none border-white/20">
                        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-1 md:mb-2">
                            10+
                        </div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Years in Business</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="pb-8 md:pb-0 border-b md:border-none border-white/20">
                        <div className="text-4xl sm:text-5xl md:text-[64px] font-black tracking-tighter mb-1 md:mb-2">
                            4,000+
                        </div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Machines Sold</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="pt-8 md:pt-0 border-r md:border-none border-white/20">
                        <div className="text-4xl sm:text-5xl md:text-[64px] font-black tracking-tighter mb-1 md:mb-2 tabular-nums">
                            {hpTotal.toLocaleString()}
                        </div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Total HP Sold</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }} className="pt-8 md:pt-0 md:border-none border-white/20">
                        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-1 md:mb-2 tabular-nums">
                            {hpDay.toLocaleString()}
                        </div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">HP / Day</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="pt-8 md:pt-0 col-span-2 md:col-span-1 md:border-none">
                        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-1 md:mb-2">5</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Brands Carried</div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TrustMetrics;
