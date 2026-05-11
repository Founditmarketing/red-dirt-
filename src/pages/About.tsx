import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';

const milestones = [
  { year: '2010s', title: 'One bay, one promise', copy: 'We opened on Hwy 71 with a simple rule: do right by the people who keep Louisiana running.' },
  { year: 'Today', title: 'Full-line dealer', copy: 'TYM, Mahindra, Ferris, Wacker Neuson, and Yanmar, backed by a parts counter and factory-trained techs.' },
  { year: 'Always', title: 'Field-first support', copy: 'When season hits, you need answers fast. Our crew dispatches field calls and keeps iron turning.' },
];

const values = [
  'We sell the brands we run on our own land.',
  'Transparent pricing and financing conversations, no mystery fees.',
  'Service that stays with you after the keys change hands.',
  'A parts room stocked for real jobs, not showroom props.',
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Red Dirt Tractors &amp; Construction Equipment</title>
        <meta
          name="description"
          content="Family-owned TYM, Mahindra, Ferris, and Wacker Neuson dealer in Alexandria, LA. Our story, values, and why Central Louisiana trusts Red Dirt for iron and service."
        />
        <link rel="canonical" href="https://reddirt-tractors.com/about" />
      </Helmet>

      <PageHero
        eyebrow="Red Dirt Tractors"
        title="Built in Louisiana. Proven in the field."
        subtitle="We are not a generic landing page. We are a brick-and-mortar dealership with live inventory, working bays, and a parts counter that stays busy."
        imageSrc="/hero_about.png"
        imageAlt=""
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4">
              The short version
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-charcoal leading-tight mb-6">
              Family owned. Field tested. Still hungry.
            </h2>
            <p className="text-charcoal/70 font-medium leading-relaxed text-lg mb-8">
              Red Dirt started where most good dealerships do: solving problems for neighbors who
              could not afford downtime. That mindset never left. We just added more brands, more
              techs, and more iron on the lot.
            </p>
            <Link
              to="/inventory"
              className="inline-flex items-center gap-3 bg-brand-red text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-brand-red-dark transition-colors shadow-lg"
            >
              Shop live inventory
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {milestones.map((item, i) => (
              <motion.article
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-l-4 border-brand-red pl-8 py-2"
              >
                <p className="text-brand-red font-black uppercase tracking-widest text-xs mb-2">
                  {item.year}
                </p>
                <h3 className="font-heading font-black uppercase text-2xl text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 font-medium leading-relaxed text-base md:text-lg">
                  {item.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-off-white border-y border-charcoal/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-4">
                What we stand for
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-charcoal mb-8">
                Dealership promises you can actually hold us to
              </h2>
              <ul className="space-y-5">
                {values.map((v) => (
                  <li key={v} className="flex gap-4">
                    <CheckCircle2 className="text-brand-red shrink-0 mt-0.5" size={22} />
                    <span className="text-charcoal/80 font-medium leading-relaxed text-lg">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] bg-charcoal overflow-hidden rounded-sm"
            >
              <img
                src="/about.jpg"
                alt="Red Dirt Tractors team and headquarters"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-1">
                  Visit the lot
                </p>
                <p className="font-heading font-black uppercase text-xl md:text-2xl tracking-tight">
                  7547 Hwy 71 South, Alexandria, LA
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-charcoal text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
              Ready to talk iron?
            </h2>
            <p className="text-white/65 font-medium max-w-xl">
              Text, call, or stop by, whichever fits your day. We will meet you with the same crew
              that turns wrenches in the shop.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="sms://+13184429010"
              className="text-center bg-brand-red hover:bg-brand-red-dark text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Text us
            </a>
            <Link
              to="/contact"
              className="text-center border border-white/30 hover:bg-white hover:text-charcoal text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Hours &amp; directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
