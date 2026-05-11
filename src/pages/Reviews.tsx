import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';
import { REVIEWS } from '../data/reviews';

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Customer Reviews | Red Dirt Tractors</title>
        <meta
          name="description"
          content="Verified buyers share how Red Dirt Tractors supports tractors, implements, financing, and service across Central Louisiana."
        />
        <link rel="canonical" href="https://reddirt-tractors.com/reviews" />
      </Helmet>

      <PageHero
        eyebrow="Social proof"
        title="The word from the field"
        subtitle="We earn trust the old-fashioned way: showing up with the right machine, honoring the warranty conversation, and keeping parts on the shelf."
      />

      <section className="py-16 md:py-24 bg-off-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {REVIEWS.map((review, index) => (
              <motion.article
                key={`${review.name}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white p-8 md:p-10 shadow-lg border-t-4 border-charcoal/10 hover:border-brand-red transition-colors flex flex-col h-full"
              >
                <div className="flex gap-1 mb-6 text-brand-red">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-charcoal/80 font-medium leading-relaxed text-base md:text-lg flex-grow mb-8">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <h2 className="font-bold text-charcoal uppercase tracking-tighter text-lg">
                    {review.name}
                  </h2>
                  <p className="text-sm text-brand-red font-bold uppercase tracking-widest mt-1">
                    {review.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 md:mt-20 text-center border border-charcoal/10 bg-white rounded-sm p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-charcoal mb-4">
              Bought here? Tell us how we did.
            </h2>
            <p className="text-charcoal/65 font-medium max-w-2xl mx-auto mb-8">
              We read every piece of feedback. If something missed the mark, we want to make it
              right, preferably straight from your cab, not buried in comments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex justify-center bg-brand-red text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-brand-red-dark transition-colors"
              >
                Contact the team
              </Link>
              <Link
                to="/inventory"
                className="inline-flex justify-center border border-charcoal/20 text-charcoal px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:border-brand-red hover:text-brand-red transition-colors"
              >
                Browse inventory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
