import { motion } from 'framer-motion';
import { ChevronRight, Phone, Truck } from 'lucide-react';

const Trailers = () => {
    return (
        <div className="pt-24 min-h-screen bg-off-white">

            {/* Hero Header */}
            <section className="relative h-[45vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden mt-16 md:mt-0">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-brand-red/20 z-10" />
                    <img src="/hero_trailers.png" alt="Trailers" className="w-full h-full object-cover" />
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
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Haul It All</h3>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 md:mb-6 leading-none">
                            Trailers<span className="text-brand-red">.</span>
                        </h1>
                        <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl border-l-4 border-brand-red pl-4 md:pl-6 leading-relaxed">
                            From utility trailers to heavy-duty equipment haulers, we carry trailers built tough enough for the job.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Trailer Categories */}
            <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[2px] bg-brand-red"></span>
                        <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">What We Carry</h3>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-charcoal leading-none">
                        Trailer <span className="text-black/20">Lineup</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Utility Trailers',
                            description: 'Versatile and dependable for everyday hauling needs around the farm, job site, or property.',
                        },
                        {
                            title: 'Equipment Trailers',
                            description: 'Heavy-duty trailers designed to transport tractors, skid steers, excavators, and other large equipment.',
                        },
                        {
                            title: 'Dump Trailers',
                            description: 'Hydraulic dump trailers for moving dirt, gravel, debris, and materials with ease.',
                        },
                        {
                            title: 'Flatbed Trailers',
                            description: 'Open flatbed designs for maximum flexibility when loading and hauling oversized cargo.',
                        },
                        {
                            title: 'Enclosed Trailers',
                            description: 'Protect your cargo from the elements with fully enclosed trailer options.',
                        },
                        {
                            title: 'Specialty Trailers',
                            description: 'Ask us about specialty trailer options for unique hauling requirements.',
                        },
                    ].map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="bg-white border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-500 p-8 md:p-10 h-full flex flex-col rounded-sm group">
                                <div className="w-12 h-12 bg-brand-red/10 flex items-center justify-center rounded-sm mb-6 group-hover:bg-brand-red transition-colors">
                                    <Truck size={24} className="text-brand-red group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black text-charcoal uppercase tracking-tight mb-3">{category.title}</h3>
                                <p className="text-charcoal/60 font-medium leading-relaxed flex-grow">{category.description}</p>
                            </div>
                        </motion.div>
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
                            Ready to <span className="text-brand-red">Haul?</span>
                        </h2>
                        <p className="text-white/60 font-medium max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
                            Call or text us today to check availability, get pricing, or schedule a visit to see our trailer inventory in person.
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
        </div>
    );
};

export default Trailers;
