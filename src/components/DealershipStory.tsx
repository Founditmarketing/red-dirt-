import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const DealershipStory = () => {
    return (
        <section id="about" className="py-16 md:py-32 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
                    
                    {/* Visual / Facility Placeholder */}
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="aspect-[4/3] bg-charcoal relative overflow-hidden rounded-sm shadow-2xl"
                        >
                            {/* Will be replaced by actual facility/team photo */}
                            <img 
                                src="/hero_about.png" 
                                alt="Red Dirt Dealership Facility" 
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 border-l-4 border-brand-red pl-4">
                                <h4 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">Our Headquarters</h4>
                                <p className="text-white/60 font-medium text-xs md:text-sm mt-1 uppercase tracking-widest">Hwy 71 South • Alexandria, LA</p>
                            </div>
                        </motion.div>

                        {/* Floating Credibility Badge */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute -bottom-8 -right-8 md:-right-12 bg-brand-red text-white p-6 md:p-8 shadow-2xl hidden md:block"
                        >
                            <p className="font-black text-5xl tracking-tighter">A+</p>
                            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-90">BBB Accredited<br/>Dealership</p>
                        </motion.div>
                    </div>

                    {/* Copy / Why Choose Us */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[2px] bg-brand-red"></span>
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-sm">Why Red Dirt Tractors</h3>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-charcoal leading-[0.9] mb-8">
                            Built on Trust.<br />
                            <span className="text-charcoal/30">Forged in Mud.</span>
                        </h2>
                        
                        <div className="space-y-4 md:space-y-6 text-charcoal/70 font-medium leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
                            <p>
                                When you run a farm or a construction crew, downtime isn't an inconvenience—it's lost money. That's why we don't just sell machinery; we partner with you to keep your operations moving.
                            </p>
                            <p>
                                At Red Dirt Tractors, we carry only the elite heavy iron brands like TYM, Mahindra, Ferris, and Wacker Neuson. But our real product is our award-winning service department and our massive on-hand parts inventory.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Largest inventory of TYM tractors in Central Louisiana",
                                "Factory-certified master mechanics on call 24/7",
                                "Zero-hassle financing and warranty claims",
                                "Family owned and operated since day one"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                                    </div>
                                    <span className="font-bold text-charcoal text-sm uppercase tracking-wide">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <a href="#contact" className="group inline-flex items-center gap-3 text-brand-red font-bold uppercase tracking-widest hover:text-charcoal transition-colors">
                            <span>Contact Our Team</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DealershipStory;
