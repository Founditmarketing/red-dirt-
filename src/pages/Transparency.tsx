import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, AlertTriangle, Truck, DollarSign, Handshake, Facebook } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1 }
    })
};

const Transparency = () => {
    return (
        <div className="pt-24 min-h-screen bg-off-white">

            {/* Hero Header */}
            <section className="relative h-[45vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden mt-16 md:mt-0">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-brand-red/20 z-10" />
                    <img src="/hero_transparency.png" alt="Red Dirt Lot" className="w-full h-full object-cover" />
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
                            <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Honesty First</h3>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 md:mb-6 leading-none">
                            Transparency<span className="text-brand-red">.</span>
                        </h1>
                        <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl border-l-4 border-brand-red pl-4 md:pl-6 leading-relaxed">
                            No gimmicks. No hidden costs. Just honest pricing and real value for hardworking people.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">

                    {/* Intro */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="bg-white p-6 md:p-10 shadow-xl border-t-4 border-brand-red"
                    >
                        <p className="text-charcoal/80 font-medium leading-relaxed text-sm md:text-base mb-6">
                            Red Dirt Tractors & Construction Equipment of Alexandria, Louisiana proudly brings you the latest models of <strong className="text-charcoal">Cab Tractors, Open Station Tractors, Backhoe Tractors, Skid Steers, Excavators, Utility Track Loaders, Light Towers, Concrete Tools & Equipment, Implements, Attachments, Zero-Turn Mowers, Stand-on Mowers, and Trailers.</strong>
                        </p>
                        <p className="text-charcoal/80 font-medium leading-relaxed text-sm md:text-base">
                            For over 11 years, Red Dirt has worked hard every day to bring the best value and pricing to our hardworking customers. We have recently restructured our operations to not only continue offering volume pricing, but also to deliver higher quality equipment and greater value for your investment.
                        </p>
                    </motion.div>

                    {/* No Gimmicks Block */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="bg-charcoal text-white p-6 md:p-10 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-red/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        <div className="flex items-center gap-3 md:gap-4 mb-6">
                            <div className="p-2 md:p-3 bg-brand-red/20 rounded-full shrink-0">
                                <DollarSign className="text-brand-red w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">Everyday Low Pricing</h2>
                        </div>
                        <p className="opacity-80 font-medium leading-relaxed text-sm md:text-base">
                            Red Dirt Tractors is a full-service dealership offering our everyday low-volume pricing on new equipment — <strong className="text-brand-red">no gimmicks, no tricks, no hidden costs, and no prep fees.</strong> Our equipment is ready to go and fueled up when purchased.
                        </p>
                        <p className="opacity-80 font-medium leading-relaxed text-sm md:text-base mt-4">
                            Don't accept misinformed information — verify it for yourself.
                        </p>
                        <p className="opacity-80 font-medium leading-relaxed text-sm md:text-base mt-4">
                            We also offer <strong className="text-white">Low-Rate and No-Rate Financing</strong> on all equipment (with approved credit).
                        </p>
                    </motion.div>

                    {/* Mahindra Warranty Notice */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="bg-white p-6 md:p-10 shadow-xl border-l-4 border-brand-red"
                    >
                        <div className="flex items-center gap-3 md:gap-4 mb-6">
                            <div className="p-2 md:p-3 bg-brand-red/10 rounded-full shrink-0">
                                <AlertTriangle className="text-brand-red w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">Important Customer Notice</h2>
                        </div>
                        <p className="text-charcoal/80 font-medium leading-relaxed text-sm md:text-base">
                            Mahindra warranty, repair, and service work on all Mahindra equipment is a requirement of all authorized Mahindra dealers, <strong className="text-charcoal">regardless of where the equipment was purchased.</strong> Never pay for warranty work that should be covered. If you need clear information about Mahindra warranty coverage, contact Red Dirt Tractors and we will be glad to assist.
                        </p>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <motion.div
                            custom={3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="bg-white p-6 md:p-8 shadow-sm border border-charcoal/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Handshake className="text-brand-red w-6 h-6" />
                                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Package Deals</h3>
                            </div>
                            <p className="text-charcoal/70 font-medium leading-relaxed text-sm">
                                If you need to bundle your equipment purchase with implements, attachments, or a trailer, we offer package deals that can be included in our financing specials.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="bg-white p-6 md:p-8 shadow-sm border border-charcoal/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="text-brand-red w-6 h-6" />
                                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">No Pressure Shopping</h3>
                            </div>
                            <p className="text-charcoal/70 font-medium leading-relaxed text-sm">
                                You are welcome to browse our full line of in-stock equipment on our sales lot at your convenience — no pressure. Feel free to ask for a demonstration or test drive.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={5}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="bg-white p-6 md:p-8 shadow-sm border border-charcoal/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Truck className="text-brand-red w-6 h-6" />
                                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Pre-Owned & Trade-Ins</h3>
                            </div>
                            <p className="text-charcoal/70 font-medium leading-relaxed text-sm">
                                We also carry a selection of quality pre-owned tractors, implements, trailers, and we gladly accept trade-ins.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={6}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="bg-white p-6 md:p-8 shadow-sm border border-charcoal/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="text-brand-red w-6 h-6" />
                                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Quotes & Delivery</h3>
                            </div>
                            <p className="text-charcoal/70 font-medium leading-relaxed text-sm">
                                If you need a quote, just let us know. Red Dirt Tractors can also assist with nationwide delivery arrangements.
                            </p>
                        </motion.div>
                    </div>

                    {/* Disclaimer */}
                    <motion.p
                        custom={7}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="text-charcoal/50 text-xs md:text-sm font-medium text-center italic"
                    >
                        All manufacturers represented reserve the right to change prices and/or interest rates without notice.
                    </motion.p>

                    {/* Contact Card */}
                    <motion.div
                        custom={8}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="bg-charcoal text-white p-6 md:p-10 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 relative z-10">Contact <span className="text-brand-red">Us</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
                            <div className="space-y-5">
                                <div className="flex gap-4 items-start group">
                                    <MapPin className="shrink-0 mt-1 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <div>
                                        <strong className="block text-white mb-1">Red Dirt Headquarters</strong>
                                        <span className="opacity-70">7547 Hwy 71 South<br />Alexandria, LA 71302</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center group">
                                    <Phone className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <a href="tel:3184429010" className="hover:text-white transition-colors font-bold text-lg opacity-80 hover:opacity-100">
                                        318-442-9010
                                    </a>
                                </div>
                                <p className="text-xs opacity-50 pl-9">Call or Text</p>
                            </div>
                            <div className="space-y-5">
                                <div className="flex gap-4 items-center group">
                                    <Mail className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <a href="mailto:reddirttractors@gmail.com" className="hover:text-white transition-colors font-bold opacity-80 hover:opacity-100">
                                        reddirttractors@gmail.com
                                    </a>
                                </div>
                                <div className="flex gap-4 items-center group">
                                    <Facebook className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <span className="opacity-80 font-medium text-sm">Message us on Facebook at <strong className="text-white">Red Dirt Tractors</strong></span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                            <p className="text-white/60 font-medium text-sm leading-relaxed">
                                Visit us in our equipment showroom or on our sales lot — we look forward to serving you.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default Transparency;
