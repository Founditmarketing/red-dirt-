import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import PageHero from '../components/PageHero';
import { RESOURCE_ARTICLES } from '../data/resources';

const ResourceArticle = () => {
    const { slug } = useParams();
    const article = RESOURCE_ARTICLES.find((item) => item.slug === slug);

    if (!article) {
        return <Navigate to="/resources" replace />;
    }

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.summary,
        image: `https://reddirt-tractors.com${article.heroImage}`,
        author: {
            '@type': 'Organization',
            name: 'Red Dirt Tractors',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Red Dirt Tractors',
            logo: {
                '@type': 'ImageObject',
                url: 'https://reddirt-tractors.com/logo.png',
            },
        },
        mainEntityOfPage: `https://reddirt-tractors.com/resources/${article.slug}`,
    };

    return (
        <>
            <Helmet>
                <title>{article.title} | Red Dirt Tractors</title>
                <meta name="description" content={article.summary} />
                <link
                    rel="canonical"
                    href={`https://reddirt-tractors.com/resources/${article.slug}`}
                />
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            </Helmet>

            <PageHero
                eyebrow={article.eyebrow}
                title={article.title}
                subtitle={article.summary}
                imageSrc={article.heroImage}
                imageAlt=""
            />

            <article className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8">
                        <Link
                            to="/resources"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-charcoal/55 hover:text-brand-red transition-colors mb-10"
                        >
                            <ArrowLeft size={16} />
                            Back to resources
                        </Link>

                        <div className="space-y-12">
                            {article.sections.map((section) => (
                                <section key={section.heading}>
                                    <h2 className="font-heading font-black uppercase tracking-tight text-2xl md:text-3xl text-charcoal mb-5">
                                        {section.heading}
                                    </h2>
                                    <div className="space-y-5">
                                        {section.body.map((paragraph) => (
                                            <p
                                                key={paragraph}
                                                className="text-charcoal/75 font-medium leading-relaxed text-lg max-w-3xl"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32 bg-charcoal text-white p-7 md:p-8 rounded-sm">
                            <MessageSquare className="text-brand-red mb-5" size={28} />
                            <h2 className="font-heading font-black uppercase tracking-tight text-2xl mb-4">
                                Want the local answer?
                            </h2>
                            <p className="text-white/65 font-medium leading-relaxed mb-7">
                                Tell us your acreage, jobs, and budget. We will point you toward the
                                right machine and tell you what to avoid.
                            </p>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="sms://+13184429010"
                                    className="text-center bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                >
                                    Text the team
                                </a>
                                <Link
                                    to="/inventory"
                                    className="text-center border border-white/20 hover:bg-white hover:text-charcoal px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                >
                                    Browse equipment
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </>
    );
};

export default ResourceArticle;
