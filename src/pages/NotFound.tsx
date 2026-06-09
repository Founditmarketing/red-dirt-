import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronLeft, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>Page not found | Red Dirt Tractors</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <section
                className="bg-charcoal text-white pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden min-h-[80vh] flex items-center"
            >
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-brand-red/30 pointer-events-none"
                />
                <img
                    src="/hero_about.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                />
                <div className="container mx-auto px-6 relative z-10 max-w-3xl">
                    <p className="text-brand-red font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-5">
                        404 — Off the lot
                    </p>
                    <h1 className="font-heading font-black uppercase tracking-tight text-5xl md:text-7xl leading-[0.95] mb-6">
                        That page is not on our lot.
                    </h1>
                    <p className="text-lg md:text-xl text-white/75 font-medium leading-relaxed max-w-2xl mb-10">
                        The link may have moved, the unit may already be sold, or the URL got bent
                        on the trailer. Pick a starting point below or text us and we will help you
                        find it.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                        >
                            <ChevronLeft size={14} />
                            Back home
                        </Link>
                        <Link
                            to="/inventory"
                            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-charcoal text-white px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                        >
                            Browse inventory
                            <ArrowRight size={14} />
                        </Link>
                        <a
                            href="sms://+13184429010"
                            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-charcoal text-white px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                        >
                            <MessageSquare size={14} />
                            Text the team
                        </a>
                        <a
                            href="tel:3184429010"
                            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-charcoal text-white px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                        >
                            <Phone size={14} />
                            318.442.9010
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;
