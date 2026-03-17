import { motion } from 'framer-motion';

const BrandLogos = () => {
    // Real brand logos referenced from Wikimedia/public sources
    const brands = [
        { name: "TYM Tractors", url: "/brands/tym.png" },
        { name: "Mahindra", url: "/brands/mahindra.png" },
        { name: "Wacker Neuson", url: "/brands/wacker_neuson.png" },
        { name: "Yanmar", url: "/brands/yanmar.png" }
    ];

    return (
        <section className="bg-white border-b border-charcoal/10 py-16 overflow-hidden relative">
            <div className="container mx-auto px-6">
                <p className="text-center text-sm font-bold text-charcoal/60 uppercase tracking-[0.2em] mb-12">
                    Authorized Dealer & Service Center For
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-32 md:w-48 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        >
                            <img 
                                src={brand.url} 
                                alt={`${brand.name} Logo`} 
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
