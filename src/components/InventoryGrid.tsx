import { motion } from 'framer-motion';
import { ChevronRight, Settings, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Using the exact models from the provided sheet with direct Google Drive image links
const inventoryData = [
  { id: 1, model: "T5075 PS/C", imageKey: "18zpo-qXDZIm6emvuyLJDq767WT1U3zRz" },
  { id: 2, model: "T130", imageKey: "1YfvHvbWBA9e9CYAxXEJlp_P1hZu6YLfM" },
  { id: 3, model: "T474 S/C", imageKey: "1mRtsC9B5VUsdDvLuLIUlFIaUaF550Su2" },
  { id: 4, model: "T474 HST", imageKey: "1APKsv-maVCSE0QCA0TaRAO5Z_zWG57Af" },
  { id: 5, model: "T474 BH", imageKey: "17DNVOjlBe1FLK4BbyGHT3krdQ88p3zqi" },
  { id: 6, model: "T115", imageKey: "1WkYiYNyIqhmyB4CzRiY9_rrLlYN6KRp0" },
  { id: 7, model: "T474 S", imageKey: "1nQKo8_PR48qAeHtroVo1_YOAdGp-kTah" },
  { id: 8, model: "T574", imageKey: "1HBT1TgNIw2KN3p4MI1i2JHzjOOceJmNB" },
  { id: 9, model: "T458 PU/BH", imageKey: "1wMW2tIrhGp20PYM3kZlHz6p4Fno7UoTf" },
  { id: 10, model: "T3035 HST", imageKey: "15AwjSUIjbr6w6Uom3zZObxjZbIqrvT3F" },
  { id: 11, model: "T25 HST/BH", imageKey: "1plV7OMbz8RY9tkSoe9zPsr57cjGqtgOp" },
  { id: 12, model: "T574 S", imageKey: "18gWTWFDwyIw-frS_36RUBRP7ZrC7oORk" },
  { id: 13, model: "T25 HST", imageKey: "1dUcEQWJhVr37mFRYMzVaqxixrPDW1X4J" },
  { id: 14, model: "T474 HST/C", imageKey: "1A4BCBUbPg0qXs_hnaflErUuQHm_mJLs7" },
  { id: 15, model: "T574 HST/C", imageKey: "1Cv6BDr9XyeaiJ5KchfmO9w9ASsaTBvHq" },
  { id: 16, model: "T3035 S", imageKey: "1iX03OlKsgE9cKwCgR1NUkKAVdIff8zEv" },
  { id: 17, model: "T494 HST", imageKey: "1XhDm7ooFeSNHDLxsIQ40akadFf-aiRIo" },
  { id: 18, model: "T494 HST/C", imageKey: "1Me2Un1EvV1IyQY8SWST3u6QV-PM3WgwR" },
  { id: 19, model: "T494 S/C", imageKey: "14k8GxuJ-YG5GOKNiXXAvT0RFnHwyB4g6" },
  { id: 20, model: "T3025 HST/C", imageKey: "1UW4YI_oIt-fuiEMvj4SVpsoBNpJUz2W-" },
  { id: 21, model: "T4058 PS", imageKey: "1jkcMWk-9i_w_q7ir9OYClUNu1vD4ZtHK" }
];

const InventoryGrid = () => {
    // We will slice to 6 for the "Featured" section to keep the homepage tight
    const featuredInventory = inventoryData.slice(0, 6);

    return (
        <section id="inventory" className="bg-off-white py-24 md:py-32 relative">
            <div className="container mx-auto px-6">
                
                {/* Section Header with Semantic Contrast */}
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
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-sm">Now on the Lot</h3>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-charcoal leading-none">
                            Featured <span className="text-black/20">Equipment</span>
                        </h2>
                    </motion.div>

                    <motion.div
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Magnetic Safety - Massive Touch Target for easy navigation */}
                        <a href="#full-inventory" className="group flex items-center gap-4 bg-brand-red text-white hover:bg-brand-red-dark px-10 py-5 rounded-sm transition-all shadow-xl hover:shadow-2xl">
                            <span className="font-black uppercase tracking-widest text-base">View All {inventoryData.length} Tractors</span>
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-all" />
                        </a>
                    </motion.div>
                </div>

                {/* The Grid - Harmonious Cascade Reveals */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredInventory.map((tractor, index) => (
                        <motion.div
                            key={tractor.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="h-full flex flex-col group cursor-pointer"
                        >
                            <Link to={`/equipment/${tractor.id}`} className="bg-white rounded-sm overflow-hidden border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
                                {/* Image Container with Cinematic Ken Burns */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                                    {/* Fallback/Placeholder styling until real images override */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-charcoal to-charcoal-light flex items-center justify-center opacity-50 z-0">
                                         <Settings size={40} className="text-white/20" />
                                    </div>
                                    
                                    <img 
                                        src={`/tractors/${tractor.id}.jpg`} 
                                        alt={`TYM ${tractor.model}`}
                                        onError={(e) => {
                                            // Fallback if image not found during dev
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592860882773-87ce85fb28a8?q=80&w=1200&auto=format&fit=crop';
                                        }}
                                        className="absolute inset-0 w-full h-full object-cover z-10 scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
                                    />

                                    {/* Overlay gradient to ensure text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
                                    
                                    {/* High Contrast Tag */}
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
                                <div className="p-8 flex flex-col flex-grow bg-white relative z-30">
                                    <div className="flex justify-between items-start mb-6 gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-1">TYM Tractors</p>
                                            <h3 className="text-3xl font-black text-charcoal uppercase tracking-tight group-hover:text-brand-red transition-colors">{tractor.model}</h3>
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InventoryGrid;
