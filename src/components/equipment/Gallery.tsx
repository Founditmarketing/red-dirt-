import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
    images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-[4/3] md:aspect-video bg-charcoal/5 rounded-sm overflow-hidden group">
                <AnimatePresence mode="wait">
                    {images && images.length > 0 ? (
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`Equipment view ${currentIndex + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-cover relative z-10"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full w-full opacity-50 z-10 relative">
                            <span className="font-bold uppercase tracking-widest text-sm">No Images Available</span>
                        </div>
                    )}
                </AnimatePresence>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 shadow-lg flex items-center justify-center text-charcoal hover:bg-brand-red hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 shadow-lg flex items-center justify-center text-charcoal hover:bg-brand-red hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative shrink-0 w-24 h-24  overflow-hidden transition-all ${
                                currentIndex === idx 
                                ? 'border-2 border-brand-red opacity-100' 
                                : 'border border-charcoal/10 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
