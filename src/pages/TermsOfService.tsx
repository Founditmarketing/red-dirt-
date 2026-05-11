import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Red Dirt Tractors</title>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://reddirt-tractors.com/terms" />
      </Helmet>

      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Baseline terms for browsing this website. Final sale and warranty terms appear on purchase documentation."
      />

      <article className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-charcoal/70 font-medium leading-relaxed mb-6">
            Effective date:{' '}
            <time dateTime="2026-05-04">May 4, 2026</time>. For equipment quotes and purchases,
            our team supplies the governing documents at signing.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Use of website
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            Content on this site is provided for general information. Inventory, pricing, and
            specifications may change without notice and are not binding until confirmed in
            writing by an authorized Red Dirt representative.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            No warranty on site content
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            We aim for accuracy but do not warrant that descriptions, photos, or technical data
            are error-free. Always verify horsepower, hitch class, fluids, attachments, financing
            details, or delivery timelines with sales before relying on them.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Limitation of liability
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            To the fullest extent permitted by Louisiana law, Red Dirt Tractors is not liable for
            indirect or consequential damages arising from your use of this website. Your remedy
            for dissatisfaction with the site is to stop using it.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Intellectual property
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            Dealer branding, layouts, photography, and original copy remain the property of Red
            Dirt Tractors or its licensors. OEM logos belong to their respective manufacturers.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Contact
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-10">
            Questions regarding these Terms? Reach us at{' '}
            <a href="mailto:reddirttractors@gmail.com" className="text-brand-red font-semibold hover:underline">
              reddirttractors@gmail.com
            </a>{' '}
            or{' '}
            <Link to="/contact" className="text-brand-red font-semibold hover:underline">
              visit our contact page
            </Link>
            .
          </p>

          <Link
            to="/"
            className="inline-flex text-brand-red font-bold uppercase tracking-widest text-sm hover:underline"
          >
            &lt;- Back home
          </Link>
        </div>
      </article>
    </>
  );
};

export default TermsOfService;
