import { motion } from 'framer-motion';
import { ChevronRight, Settings, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { inventoryData } from '../data/inventory';

const TractorCard = ({ tractor, index }: { tractor: typeof inventoryData[0]; index: number }) => (
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

                {/* Action Area */}
                <div className="mt-auto pt-6 border-t border-charcoal/10">
                    <div className="bg-charcoal text-white w-full py-4 px-4 flex justify-between items-center group-hover:bg-brand-red transition-colors">
                        <span className="font-bold uppercase tracking-widest">View Details</span>
                        <ChevronRight size={24} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </Link>
    </motion.div>
);

const InventoryGrid = () => {
    const featuredInventory = inventoryData.slice(0, 6);

    return (
        <>
            {/* Featured Equipment Section */}
            <section id="inventory" className="bg-off-white py-16 md:py-32 relative">
                <div className="container mx-auto px-4 md:px-6">
                    
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[2px] bg-brand-red"></span>
                                <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Now on the Lot</h3>
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-charcoal leading-none">
                                Featured <span className="text-black/20">Equipment</span>
                            </h2>
                        </motion.div>

                        <motion.div
                             initial={{ opacity: 0, x: 20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.6, delay: 0.2 }}
                             className="w-full md:w-auto"
                        >
                            <a href="#full-inventory" className="group flex items-center justify-center gap-4 bg-brand-red text-white hover:bg-brand-red-dark px-10 py-5 rounded-sm transition-all shadow-xl hover:shadow-2xl w-full">
                                <span className="font-black uppercase tracking-widest text-sm md:text-base">View All {inventoryData.length} Tractors</span>
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-all" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Featured Grid (6 items) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredInventory.map((tractor, index) => (
                            <TractorCard key={tractor.id} tractor={tractor} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Full Inventory Section */}
            <section id="full-inventory" className="bg-charcoal py-16 md:py-24 relative">
                <div className="container mx-auto px-4 md:px-6">
                    
                    {/* Section Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 md:mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-brand-red"></span>
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Complete Lineup</h3>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                            All <span className="text-white/20">Inventory</span>
                        </h2>
                        <p className="text-white/60 font-medium mt-4 max-w-xl text-sm md:text-base">
                            Browse our complete selection of {inventoryData.length} tractors and equipment currently on the lot.
                        </p>
                    </motion.div>

                    {/* Full Grid (all items) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {inventoryData.map((tractor, index) => (
                            <TractorCard key={tractor.id} tractor={tractor} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default InventoryGrid;
