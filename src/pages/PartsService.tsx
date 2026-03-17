import { motion } from 'framer-motion';
import { Wrench, Settings, ShieldCheck, Phone, ChevronRight } from 'lucide-react';

const PartsService = () => {
    return (
        <div className="pt-24 min-h-screen bg-off-white">
            
            {/* Cinematic Service Header */}
            <section className="relative h-[60vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden">
                 <div className="absolute inset-0 z-0 opacity-40">
                     {/* Temporarily using the hero image as background or a dark gradient if unvailable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-brand-red/20 z-10" />
                    <img src="/hero_drone_tractors.svg" alt="Service Bay Background" className="w-full h-full object-cover grayscale opacity-30" />
                 </div>

                 <div className="container mx-auto px-6 relative z-20">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                     >
                         <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
                             Heavy Duty <span className="text-brand-red">Service.</span><br />
                             Genuine <span className="text-white/50">Parts.</span>
                         </h1>
                         <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl border-l-4 border-brand-red pl-6 leading-relaxed">
                             Maximum uptime is our priority. Our certified technicians and fully-stocked parts counter ensure your equipment never stops working.
                         </p>
                     </motion.div>
                 </div>
            </section>

            {/* Main Content Area */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Service Request Form (The Revenue Driver) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-brand-red">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-brand-red/10 rounded-full">
                                    <Wrench className="text-brand-red" size={28} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black uppercase tracking-tight">Schedule Service</h2>
                                    <p className="text-charcoal/60 font-medium mt-1">Mobile dispatch or in-shop repair.</p>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Floating Label Style Inputs */}
                                    <div className="relative">
                                        <input type="text" id="name" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Full Name" />
                                        <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-sm">Full Name</label>
                                    </div>
                                    <div className="relative">
                                        <input type="tel" id="phone" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Phone Number" />
                                        <label htmlFor="phone" className="absolute left-0 -top-3.5 text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-sm">Phone Number</label>
                                    </div>
                                    <div className="relative md:col-span-2">
                                        <input type="text" id="equipment" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Equipment Make & Model" />
                                        <label htmlFor="equipment" className="absolute left-0 -top-3.5 text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-sm">Equipment Make & Model</label>
                                    </div>
                                    <div className="relative md:col-span-2">
                                        <textarea id="issue" rows={4} className="peer w-full border-2 border-charcoal/10 rounded-sm bg-off-white p-4 text-charcoal focus:outline-none focus:border-brand-red focus:bg-white transition-colors placeholder-transparent resize-none mt-4" placeholder="Describe the Issue"></textarea>
                                        <label htmlFor="issue" className="absolute left-4 top-0 text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-8 hover:cursor-text peer-focus:top-0 peer-focus:text-brand-red peer-focus:text-sm bg-white px-2">Describe the Issue</label>
                                    </div>
                                </div>
                                <button type="button" className="group bg-brand-red text-white px-8 py-4 w-full rounded-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-all shadow-[0_0_20px_rgba(227,24,55,0.2)] hover:shadow-[0_0_40px_rgba(227,24,55,0.4)] mt-4">
                                    <span>Submit Service Request</span>
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Parts & Trust Signals */}
                    <div className="space-y-8">
                        {/* Parts Counter Card */}
                        <div className="bg-charcoal text-white p-8 rounded-sm shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-brand-red/20 transition-all"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <Settings className="text-brand-red" size={28} />
                                <h3 className="text-2xl font-black uppercase tracking-tight">Parts Lookup</h3>
                            </div>
                            <p className="opacity-80 mb-6 font-medium leading-relaxed">Need a specific filter, belt, or hydraulic fitting? Call our dedicated parts counter directly.</p>
                            <a href="tel:3184429010" className="flex items-center justify-center gap-3 bg-white text-charcoal hover:bg-brand-red hover:text-white px-6 py-4 font-bold uppercase tracking-widest transition-all w-full">
                                <Phone size={18} />
                                <span>(318) 442-9010</span>
                            </a>
                        </div>

                        {/* Preventative Maintenance */}
                        <div className="bg-white border border-charcoal/10 p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <ShieldCheck className="text-brand-red" size={28} />
                                <h3 className="text-xl font-black uppercase tracking-tight">Maintenance Plans</h3>
                            </div>
                            <ul className="space-y-4 opacity-70 font-medium text-sm">
                                <li className="flex items-center justify-between border-b border-charcoal/10 pb-2">
                                    <span>50-Hour Checkup</span>
                                    <span className="text-brand-red font-bold">Recommended</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-charcoal/10 pb-2">
                                    <span>Winterization Service</span>
                                    <span className="font-bold">Available</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-charcoal/10 pb-2">
                                    <span>Hydraulic Flush</span>
                                    <span className="font-bold">Available</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default PartsService;
