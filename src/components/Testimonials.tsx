import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import { REVIEWS } from '../data/reviews';

const Testimonials = () => {
    return (
        <section className="py-16 md:py-24 bg-off-white relative">
            <div className="container mx-auto px-4 md:px-6">
                
                <div className="text-center mb-10 md:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-6 md:w-8 h-[2px] bg-brand-red"></span>
                        <h3 className="text-brand-red font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-xs md:text-sm">Customer Reviews</h3>
                        <span className="w-6 md:w-8 h-[2px] bg-brand-red"></span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-charcoal">
                        The word from the field
                    </h2>
                    <p className="mt-4 text-charcoal/55 font-medium max-w-xl mx-auto text-sm md:text-base">
                        Full reviews live on their own page, same story, more room to breathe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white p-6 md:p-10 shadow-lg border-t-4 border-charcoal/10 hover:border-brand-red transition-colors flex flex-col h-full"
                        >
                            <div className="flex gap-1 mb-4 md:mb-6 text-brand-red">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />
                                ))}
                            </div>
                            
                            <p className="text-charcoal/80 font-medium leading-relaxed mb-6 md:mb-8 flex-grow text-sm md:text-base">
                                &ldquo;{review.text}&rdquo;
                            </p>

                            <div className="mt-auto">
                                <h4 className="font-bold text-charcoal uppercase tracking-tighter text-base md:text-lg">{review.name}</h4>
                                <p className="text-xs md:text-sm text-brand-red font-bold uppercase tracking-widest">{review.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        to="/reviews"
                        className="group inline-flex items-center gap-3 text-charcoal font-bold uppercase tracking-[0.2em] text-sm border-b border-charcoal pb-1 hover:text-brand-red hover:border-brand-red transition-colors"
                    >
                        Read reviews on a dedicated page
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
