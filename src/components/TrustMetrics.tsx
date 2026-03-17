import { motion } from 'framer-motion';

const TrustMetrics = () => {
    return (
        <section className="bg-brand-red text-white py-20 relative overflow-hidden">
             {/* Abstract Mechanical Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/20">
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-1 md:mb-2">10</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Years in Business</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <div className="text-4xl sm:text-5xl md:text-[64px] font-black tracking-tighter mb-1 md:mb-2">4,000+</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Machines Sold</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-1 md:mb-2">4</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Certified Techs</div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <div className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-1 md:mb-2">24/7</div>
                        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80">Field Service</div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TrustMetrics;
