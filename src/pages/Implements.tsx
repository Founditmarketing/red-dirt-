import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';

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
    return (
        <div className="pt-24 min-h-screen bg-off-white">

            {/* Hero Header */}
            <section className="relative h-[45vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden mt-16 md:mt-0">
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
                        <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl border-l-4 border-brand-red pl-4 md:pl-6 leading-relaxed">
                            Complete your setup with our full range of quality implements, attachments, and accessories in stock and ready to go.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {implements_gallery.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white rounded-sm overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
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
        </div>
    );
};

export default Implements;
