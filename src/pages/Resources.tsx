import { Helmet } from 'react-helmet-async';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';
import { RESOURCE_ARTICLES } from '../data/resources';

const Resources = () => {
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Red Dirt Tractors Resource Center',
        description:
            'Buying guides, service advice, financing explainers, and equipment ownership resources from Red Dirt Tractors.',
        url: 'https://reddirt-tractors.com/resources',
        mainEntity: RESOURCE_ARTICLES.map((article) => ({
            '@type': 'Article',
            headline: article.title,
            description: article.summary,
            url: `https://reddirt-tractors.com/resources/${article.slug}`,
        })),
    };

    return (
        <>
            <Helmet>
                <title>Resource Center | Red Dirt Tractors</title>
                <meta
                    name="description"
                    content="Buying guides, service advice, financing explainers, and equipment ownership resources from Red Dirt Tractors in Alexandria, Louisiana."
                />
                <link rel="canonical" href="https://reddirt-tractors.com/resources" />
                <script type="application/ld+json">
                    {JSON.stringify(collectionSchema)}
                </script>
            </Helmet>

            <PageHero
                eyebrow="Resource center"
                title="Better answers before you buy."
                subtitle="Guides for acreage owners, farmers, contractors, and crews comparing tractors, mowers, trailers, financing, service, and ownership costs."
                imageSrc="/hero_transparency.png"
                imageAlt=""
            />

            <section className="py-16 md:py-24 bg-off-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {RESOURCE_ARTICLES.map((article) => (
                            <Link
                                key={article.slug}
                                to={`/resources/${article.slug}`}
                                className="group bg-white border border-charcoal/10 hover:border-brand-red/50 transition-colors overflow-hidden flex flex-col min-h-full"
                            >
                                <div className="relative aspect-[4/3] bg-charcoal overflow-hidden">
                                    <img
                                        src={article.heroImage}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5">
                                        {article.eyebrow}
                                    </div>
                                </div>

                                <div className="p-7 md:p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-charcoal/45 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                        <BookOpen size={14} />
                                        {article.readTime}
                                    </div>
                                    <h2 className="font-heading font-black uppercase tracking-tight text-2xl text-charcoal leading-tight mb-4 group-hover:text-brand-red transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-charcoal/65 font-medium leading-relaxed mb-7 flex-grow">
                                        {article.summary}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
                                        Read guide
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Resources;
