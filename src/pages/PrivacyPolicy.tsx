import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Red Dirt Tractors</title>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://reddirt-tractors.com/privacy" />
      </Helmet>

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Straight language about how we handle information when you browse, inquire, or do business with us."
      />

      <article className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-charcoal/70 font-medium leading-relaxed mb-6">
            Effective date:{' '}
            <time dateTime="2026-05-04">May 4, 2026</time>. Questions? Email{' '}
            <a href="mailto:reddirttractors@gmail.com" className="text-brand-red font-semibold hover:underline">
              reddirttractors@gmail.com
            </a>
            .
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Information we collect
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            We may collect basic contact details you voluntarily provide, including name, phone number, email
            address, in order to reply to inquiries, coordinate service appointments, complete
            sales transactions, or follow up on financing. We may also collect technical data sent
            by your browser, such as IP address and device characteristics, via standard analytics
            or hosting logs to keep the website secure.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            How we use information
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            We use contact information solely to communicate about your dealership experience:
            quoting equipment, arranging delivery, notifying you when parts arrive, confirming
            service, and complying with lawful financial or warranty requirements. We do not sell
            your personal information.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Cookies &amp; analytics
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            Our site may use cookies or similar technologies to remember preferences, measure
            traffic, or improve performance. You can control cookies through your browser
            settings.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Retention
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-4">
            We retain business records only as long as needed for lawful operations, such as taxes,
            warranty documentation, lien perfection, or service history, or as otherwise required
            by law.
          </p>

          <h2 className="font-heading font-black uppercase text-xl text-charcoal mt-10 mb-3">
            Changes
          </h2>
          <p className="text-charcoal/70 font-medium leading-relaxed mb-10">
            We may revise this Policy from time to time. Updates will appear on this page with a new
            effective date above.
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

export default PrivacyPolicy;
