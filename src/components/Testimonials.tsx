import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "RMark Lumpkin",
            role: "Verified Buyer",
            text: "Excellent customer service, very knowledgeable as well as helpful. We bought a Mahindra tractor and the process was smooth from start to finish.",
            rating: 5
        },
        {
            name: "Verified Customer",
            role: "Local Farmer",
            text: "The customer service during my tractor purchase was absolutely amazing. They didn't just try to sell me a piece of equipment; they made sure I got exactly what I needed for my property.",
            rating: 5
        },
        {
            name: "Local Contractor",
            role: "Heavy Equipment Buyer",
            text: "Great selection of outdoor power equipment and tractors. The staff really knows their stuff when it comes to implements and financing options. Built on family values.",
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-off-white relative">
            <div className="container mx-auto px-6">
                
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-8 h-[2px] bg-brand-red"></span>
                        <h3 className="text-brand-red font-bold tracking-[0.2em] uppercase text-sm">Customer Reviews</h3>
                        <span className="w-8 h-[2px] bg-brand-red"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-charcoal">
                        The Word From <span className="text-charcoal/30">The Field</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white p-8 md:p-10 shadow-lg border-t-4 border-charcoal/10 hover:border-brand-red transition-colors flex flex-col h-full"
                        >
                            <div className="flex gap-1 mb-6 text-brand-red">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            
                            <p className="text-charcoal/80 font-medium leading-relaxed mb-8 flex-grow">
                                "{review.text}"
                            </p>

                            <div className="mt-auto">
                                <h4 className="font-bold text-charcoal uppercase tracking-tighter text-lg">{review.name}</h4>
                                <p className="text-sm text-brand-red font-bold uppercase tracking-widest">{review.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
