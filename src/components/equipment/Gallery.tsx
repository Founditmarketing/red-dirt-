import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface GalleryProps {
    images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const total = images?.length ?? 0;

    useEffect(() => {
        setCurrentIndex(0);
    }, [images]);

    const handlePrevious = () => {
        if (total === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const handleNext = () => {
        if (total === 0) return;
        setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const dx = touchEndX.current - touchStartX.current;
        const threshold = 50;
        if (dx > threshold) handlePrevious();
        else if (dx < -threshold) handleNext();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className="space-y-4">
            <div
                className="relative aspect-[4/3] md:aspect-video bg-charcoal/5 rounded-sm overflow-hidden group select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <AnimatePresence mode="wait">
                    {total > 0 ? (
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`Equipment photo ${currentIndex + 1} of ${total}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            decoding="async"
                            loading={currentIndex === 0 ? 'eager' : 'lazy'}
                            className="w-full h-full object-cover relative z-10"
                            draggable={false}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full w-full text-charcoal/45 z-10 relative">
                            <ImageIcon size={36} className="mb-3" />
                            <span className="font-bold uppercase tracking-widest text-sm">
                                No images yet
                            </span>
                        </div>
                    )}
                </AnimatePresence>

                {total > 1 ? (
                    <>
                        <button
                            type="button"
                            onClick={handlePrevious}
                            aria-label="Previous photo"
                            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/90 shadow-lg flex items-center justify-center text-charcoal hover:bg-brand-red hover:text-white transition-colors md:opacity-0 md:group-hover:opacity-100"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next photo"
                            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/90 shadow-lg flex items-center justify-center text-charcoal hover:bg-brand-red hover:text-white transition-colors md:opacity-0 md:group-hover:opacity-100"
                        >
                            <ChevronRight size={22} />
                        </button>

                        <div className="absolute bottom-3 right-3 z-20 bg-black/55 text-white text-[11px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm">
                            {currentIndex + 1} / {total}
                        </div>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:hidden">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    aria-hidden
                                    className={`h-1.5 rounded-full transition-all ${
                                        i === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/45'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                ) : null}
            </div>

            {total > 1 ? (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Show photo ${idx + 1}`}
                            aria-pressed={currentIndex === idx}
                            className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden snap-start transition-all ${
                                currentIndex === idx
                                    ? 'ring-2 ring-brand-red opacity-100'
                                    : 'border border-charcoal/10 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <img
                                src={img}
                                alt=""
                                aria-hidden
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Gallery;
