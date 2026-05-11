import { Helmet } from 'react-helmet-async';
import { ChevronRight, MapPin, Wrench, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import PageHero from '../components/PageHero';
import { DEALER_CITIES } from '../data/dealerCities';

const DealerCity = () => {
    const { slug } = useParams();
    const city = DEALER_CITIES.find((c) => c.slug === slug);

    if (!city) {
        return <Navigate to="/contact" replace />;
    }

    const title = `Tractor Dealer in ${city.name}, ${city.state} | Red Dirt Tractors`;
    const description = `Authorized TYM, Mahindra, Ferris, Wacker Neuson, and Yanmar dealer serving ${city.name}, ${city.state} from our Alexandria, LA store. Sales, parts, service, financing, and trade-ins.`;

    const breadcrumbs = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://reddirt-tractors.com/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Service area',
                item: 'https://reddirt-tractors.com/contact',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: `${city.name}, ${city.state}`,
                item: `https://reddirt-tractors.com/dealer/${city.slug}`,
            },
        ],
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`https://reddirt-tractors.com/dealer/${city.slug}`} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
            </Helmet>

            <PageHero
                eyebrow={`Serving ${city.name}, ${city.state}`}
                title={`${city.name}'s tractor dealer is on Hwy 71.`}
                subtitle={city.summary}
                imageSrc="/hero_inventory.png"
                imageAlt=""
            />

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">
                            What we do for {city.name}
                        </p>
                        <h2 className="font-heading font-black uppercase tracking-tight text-3xl md:text-4xl text-charcoal leading-tight mb-6">
                            Brands, service, parts, and financing in one shop.
                        </h2>
                        <div className="space-y-5 text-charcoal/70 font-medium leading-relaxed text-base md:text-lg max-w-2xl">
                            <p>
                                Red Dirt Tractors carries TYM, Mahindra, Ferris, Wacker Neuson, and
                                Yanmar at our Alexandria store. Customers from {city.name} regularly
                                drive in for sales and trade-ins, and we keep the parts counter and
                                service bays running for ongoing support.
                            </p>
                            <p>
                                {city.distance === 'Headquarters'
                                    ? 'You are right here at the source.'
                                    : `We are roughly ${city.distance.toLowerCase()} from ${city.name}, and our team works with ${city.name} buyers every week.`}
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {city.serves.map((area) => (
                                <div
                                    key={area}
                                    className="flex items-start gap-3 bg-off-white border border-charcoal/10 px-5 py-4"
                                >
                                    <MapPin className="text-brand-red shrink-0 mt-0.5" size={18} />
                                    <span className="font-medium text-charcoal/75 text-sm">{area}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32 bg-charcoal text-white p-7 md:p-9 rounded-sm">
                            <h3 className="font-heading font-black uppercase tracking-tight text-2xl mb-5">
                                Visit or call
                            </h3>
                            <ul className="space-y-4 text-white/80 font-medium">
                                <li className="flex gap-3 items-start">
                                    <MapPin className="text-brand-red shrink-0 mt-1" size={18} />
                                    <span>
                                        7547 Hwy 71 South<br />Alexandria, LA 71302
                                    </span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Wrench className="text-brand-red shrink-0" size={18} />
                                    <Link to="/parts-service" className="hover:text-brand-red transition-colors">
                                        Parts &amp; service support
                                    </Link>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <ShieldCheck className="text-brand-red shrink-0" size={18} />
                                    <Link to="/financing" className="hover:text-brand-red transition-colors">
                                        Brand-specific financing
                                    </Link>
                                </li>
                            </ul>
                            <div className="mt-7 grid grid-cols-1 gap-3">
                                <a
                                    href="tel:3184429010"
                                    className="text-center bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                >
                                    Call 318-442-9010
                                </a>
                                <a
                                    href="sms://+13184429010"
                                    className="text-center border border-white/30 hover:bg-white hover:text-charcoal text-white px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                >
                                    Text us
                                </a>
                                <Link
                                    to="/inventory"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-charcoal hover:bg-off-white px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                >
                                    Browse inventory
                                    <ChevronRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-off-white border-t border-charcoal/10 py-14">
                <div className="container mx-auto px-6">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-5">
                        Other communities we serve
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {DEALER_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
                            <Link
                                key={c.slug}
                                to={`/dealer/${c.slug}`}
                                className="inline-flex items-center gap-2 border border-charcoal/20 hover:border-brand-red hover:text-brand-red px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-charcoal transition-colors"
                            >
                                {c.name}, {c.state}
                                <ChevronRight size={14} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DealerCity;
