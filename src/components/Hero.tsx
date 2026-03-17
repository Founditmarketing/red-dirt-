import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-brand-red/30 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-white pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-[2px] bg-brand-red"></span>
                        <h2 className="text-brand-red font-bold tracking-[0.2em] uppercase text-sm md:text-base bg-black/20 backdrop-blur-sm px-3 py-1 rounded-sm inline-block">
                            Central Louisiana's Premier Dealer
                        </h2>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.9] mb-8 drop-shadow-2xl">
                        Move the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Earth.</span><br />
                        Master the <span className="text-brand-red">Land.</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-white/80 max-w-2xl mb-12 font-light leading-relaxed border-l-4 border-brand-red pl-6">
                        Headquarters for heavy-duty construction equipment, premium tractors, and the attachments to get the job done right.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="group bg-brand-red text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-all shadow-[0_0_20px_rgba(227,24,55,0.4)] hover:shadow-[0_0_40px_rgba(227,24,55,0.6)]">
                            <span>Browse Inventory</span>
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="group border border-white text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-charcoal transition-all">
                            <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
                                <Play size={10} fill="currentColor" />
                            </div>
                            <span>Watch Video</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-3 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-brand-red to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
