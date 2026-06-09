import { Helmet } from 'react-helmet-async';
import { Clock, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';

import PageHero from '../components/PageHero';

const MAP_EMBED =
  'https://maps.google.com/maps?q=7547+Hwy+71+South+Alexandria+LA+71302&hl=en&z=14&output=embed';
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=7547+Hwy+71+South+Alexandria+LA+71302';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Plan Your Visit | Red Dirt Tractors</title>
        <meta
          name="description"
          content="Visit Red Dirt Tractors on Hwy 71 in Alexandria, LA. Store hours, phone, email, and directions to our dealership and service department."
        />
        <link rel="canonical" href="https://reddirt-tractors.com/contact" />
      </Helmet>

      <PageHero
        eyebrow="Plan Your Visit"
        title="Let's get you on the schedule."
        subtitle="Call the parts counter, book a service appointment, or walk the lot with someone who actually runs equipment — not a call center."
        imageSrc="/hero_contact.png"
        imageAlt=""
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-charcoal mb-6">
                Red Dirt headquarters
              </h2>
              <ul className="space-y-6 text-charcoal/80 font-medium">
                <li className="flex gap-4">
                  <MapPin className="text-brand-red shrink-0 mt-1" size={22} />
                  <span>
                    7547 Hwy 71 South
                    <br />
                    Alexandria, LA 71302
                  </span>
                </li>
                <li className="flex gap-4 items-center">
                  <Phone className="text-brand-red shrink-0" size={22} />
                  <a href="tel:3184429010" className="hover:text-brand-red transition-colors font-bold text-lg text-charcoal">
                    318-442-9010
                  </a>
                </li>
                <li className="flex gap-4 items-center">
                  <Mail className="text-brand-red shrink-0" size={22} />
                  <a
                    href="mailto:reddirttractors@gmail.com"
                    className="hover:text-brand-red transition-colors font-bold text-charcoal"
                  >
                    reddirttractors@gmail.com
                  </a>
                </li>
                <li className="flex gap-4 items-start">
                  <MessageSquare className="text-brand-red shrink-0 mt-1" size={22} />
                  <a
                    href="sms://+13184429010"
                    className="hover:text-brand-red transition-colors font-bold text-charcoal"
                  >
                    Text +1 (318) 442-9010
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-charcoal/10 rounded-sm p-6 md:p-8 bg-off-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-brand-red" size={22} />
                <h3 className="font-black uppercase tracking-tight text-charcoal text-lg">
                  Hours
                </h3>
              </div>
              <ul className="space-y-3 text-charcoal/75 font-medium text-sm md:text-base">
                <li className="flex justify-between gap-4">
                  <span>Monday - Friday</span>
                  <span className="font-bold text-charcoal">8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Saturday</span>
                  <span className="font-bold text-charcoal">8:00 AM - 3:00 PM</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sunday</span>
                  <span className="font-bold text-charcoal/50">Closed</span>
                </li>
              </ul>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-charcoal text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-brand-red transition-colors"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-square md:aspect-[4/3] w-full rounded-sm overflow-hidden border border-charcoal/10 shadow-xl bg-charcoal/5">
              <iframe
                title="Map showing Red Dirt Tractors at 7547 Hwy 71 South, Alexandria, Louisiana"
                src={MAP_EMBED}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs text-charcoal/45 mt-4 font-medium">
              Map data may differ from roadway conditions, verify directions before hauling wide
              loads.
            </p>
          </div>
        </div>
      </section>


    </>
  );
};

export default Contact;
