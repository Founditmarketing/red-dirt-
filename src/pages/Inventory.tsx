import { motion } from 'framer-motion';
import { ChevronRight, Settings, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { inventoryData } from '../data/inventory';

const Inventory = () => {
    return (
        <div className="pt-24 min-h-screen bg-off-white">
            {/* Hero Header */}
            <section className="relative h-[45vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden mt-16 md:mt-0">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-brand-red/20 z-10" />
                    <img src="/hero_drone_tractors.svg" alt="Equipment Lot" className="w-full h-full object-cover grayscale opacity-30" />
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
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Complete Lineup</h3>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 md:mb-6 leading-none">
                            All <span className="text-brand-red">Inventory</span>
                        </h1>
                        <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl border-l-4 border-brand-red pl-4 md:pl-6 leading-relaxed">
                            Browse our complete selection of {inventoryData.length} tractors and equipment currently on the lot.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Full Inventory Grid */}
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {inventoryData.map((tractor, index) => (
                        <motion.div
                            key={tractor.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="h-full flex flex-col group cursor-pointer"
                        >
                            <Link to={`/equipment/${tractor.id}`} className="bg-white rounded-sm overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-charcoal to-charcoal-light flex items-center justify-center opacity-50 z-0">
                                         <Settings size={40} className="text-white/20" />
                                    </div>
                                    
                                    <img 
                                        src={`/tractors/${tractor.id}.jpg`} 
                                        alt={`${tractor.make} ${tractor.model}`}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592860882773-87ce85fb28a8?q=80&w=1200&auto=format&fit=crop';
                                        }}
                                        className="absolute inset-0 w-full h-full object-cover z-10 scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
                                    
                                    <div className="absolute top-4 left-4 z-30">
                                        <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg backdrop-blur-sm">
                                            In Stock
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 right-4 z-30 bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Maximize2 size={16} className="text-white" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative z-30">
                                    <div className="flex justify-between items-start mb-6 gap-4">
                                        <div>
                                            <p className="text-xs md:text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-1">{tractor.make}</p>
                                            <h3 className="text-2xl md:text-3xl font-black text-charcoal uppercase tracking-tight group-hover:text-brand-red transition-colors">{tractor.model}</h3>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-1">Price</p>
                                            <p className="text-lg font-black text-brand-red">Call Us</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-charcoal/10">
                                        <div className="bg-charcoal text-white w-full py-4 px-4 flex justify-between items-center group-hover:bg-brand-red transition-colors">
                                            <span className="font-bold uppercase tracking-widest">View Details</span>
                                            <ChevronRight size={24} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Inventory;
