import { motion } from 'framer-motion';

import ResponsivePicture from './ResponsivePicture';

type PageHeroProps = {
    eyebrow: string;
    title: string;
    subtitle?: string;
    imageSrc?: string;
    imageAlt?: string;
};

// Map a /hero_*.png path to its optimized base + widths if generated.
// Returns null when no optimized variant exists, so the original keeps working.
const optimizedFor = (
    src: string,
): { base: string; widths: number[] } | null => {
    const m = src.match(/^\/(hero_[a-zA-Z_]+|about)\.(?:png|jpe?g)$/);
    if (!m) return null;
    return { base: `/${m[1]}`, widths: [768, 1280, 1920] };
};

const PageHero = ({ eyebrow, title, subtitle, imageSrc, imageAlt = '' }: PageHeroProps) => {
    const optimized = imageSrc ? optimizedFor(imageSrc) : null;

    return (
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-charcoal text-white overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-brand-red/25 pointer-events-none"
            />
            {imageSrc ? (
                <>
                    {optimized ? (
                        <ResponsivePicture
                            base={optimized.base}
                            fallback={imageSrc}
                            widths={optimized.widths}
                            sizes="100vw"
                            alt={imageAlt}
                            className="absolute inset-0 w-full h-full"
                            imgClassName="absolute inset-0 w-full h-full object-cover opacity-25"
                            loading="eager"
                            decoding="async"
                        />
                    ) : (
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            loading="eager"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover opacity-25"
                        />
                    )}
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/80"
                    />
                </>
            ) : null}

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl"
                >
                    <p className="text-brand-red font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-4">
                        {eyebrow}
                    </p>
                    <h1 className="font-heading font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
                        {title}
                    </h1>
                    {subtitle ? (
                        <p className="text-lg md:text-xl text-white/75 font-medium leading-relaxed max-w-2xl">
                            {subtitle}
                        </p>
                    ) : null}
                </motion.div>
            </div>
        </section>
    );
};

export default PageHero;
