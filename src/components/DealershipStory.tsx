import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DealershipStory = () => {
    return (
        <section
            id="about"
            className="relative py-20 md:py-32 bg-white border-y border-charcoal/10"
        >
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 relative"
                >
                    <div className="aspect-[5/4] overflow-hidden bg-charcoal relative">
                        <img
                            src="/about.jpg"
                            alt="Red Dirt Tractors team and headquarters"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 hidden md:block bg-charcoal text-white px-7 py-5">
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-1">
                            BBB Accredited
                        </p>
                        <p className="font-heading font-black tracking-tighter text-4xl">
                            A+
                        </p>
                    </div>
                </motion.div>

                {/* Copy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6"
                >
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-5">
                        Why Red Dirt
                    </p>
                    <h2 className="font-heading font-black uppercase tracking-tight text-charcoal text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-8">
                        Family owned.
                        <br />
                        Field tested.
                    </h2>

                    <div className="space-y-5 text-charcoal/70 leading-relaxed font-medium text-base md:text-lg max-w-xl mb-10">
                        <p>
                            We started with one bay on Hwy 71 and a simple rule: do
                            right by the people who keep Louisiana running. A decade
                            later we are still that outfit, just with more iron and
                            more techs.
                        </p>
                        <p>
                            We carry the brands we trust on our own land, our parts
                            counter is stocked deep, and our service crew is ready
                            when your equipment needs attention.
                        </p>
                    </div>

                    <Link
                        to="/about"
                        className="group inline-flex items-center gap-3 text-charcoal font-bold uppercase tracking-[0.25em] text-sm border-b border-charcoal pb-1 hover:text-brand-red hover:border-brand-red transition-colors"
                    >
                        Read our story
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default DealershipStory;
