import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                <iframe
                    className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[178vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-80 scale-[1.2] md:scale-100 transform-gpu"
                    src="https://www.youtube.com/embed/jhSXD3w-Hgg?autoplay=1&mute=1&loop=1&playlist=jhSXD3w-Hgg&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    tabIndex={-1}
                ></iframe>
                {/* Cinematic Gradient Overlay (Opacity-based for iOS Safari compatibility) */}
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-brand-red/30 pointer-events-none" />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-white pt-12 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-5xl w-full"
                >
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <span className="w-8 md:w-12 h-[2px] bg-brand-red"></span>
                        <h2 className="text-brand-red font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs sm:text-sm md:text-base bg-transparent md:bg-black/20 md:backdrop-blur-sm md:px-3 md:py-1 md:rounded-sm inline-block">
                            <span className="md:hidden">Premier Dealer</span>
                            <span className="hidden md:inline">Central Louisiana's Premier Dealer</span>
                        </h2>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-black uppercase leading-[1.1] md:leading-tight mb-6 md:mb-8 drop-shadow-2xl whitespace-nowrap">
                        Move the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Earth.</span><br />
                        Master the <span className="text-brand-red">Land.</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-2xl mb-8 md:mb-12 font-light leading-relaxed border-l-4 border-brand-red pl-4 md:pl-6">
                        Headquarters for heavy-duty construction equipment, premium tractors, and the attachments to get the job done right.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
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
