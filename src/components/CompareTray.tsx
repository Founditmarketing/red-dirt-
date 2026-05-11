import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Scale, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCompare } from '../context/CompareContext';
import { processGoogleDriveUrl } from '../utils/imageFormat';

const pickImage = (item: any): string | undefined => {
    const fields = ['Image URL', 'image_url', 'images', 'image', 'photos', 'image url'];
    for (const key of fields) {
        const value = item?.[key];
        if (typeof value === 'string' && value.trim() !== '') {
            const first = value.split(/[\s,]+/).filter(Boolean)[0];
            if (first) return processGoogleDriveUrl(first);
        }
    }
    return undefined;
};

const CompareTray = () => {
    const { items, remove, clear } = useCompare();

    return (
        <AnimatePresence>
            {items.length > 0 ? (
                <motion.aside
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)' }}
                    className="fixed left-0 right-0 bottom-0 z-40 bg-charcoal text-white border-t border-white/10 shadow-[0_-12px_30px_rgba(0,0,0,0.35)]"
                >
                    <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <div className="flex items-center gap-3 shrink-0">
                            <Scale className="text-brand-red" size={18} />
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85">
                                Compare ({items.length}/3)
                            </p>
                        </div>

                        <ul className="flex-1 flex flex-wrap gap-2 md:gap-3 min-w-0">
                            {items.map((item) => {
                                const img = pickImage(item);
                                const label = `${item.make || ''} ${item.model || ''}`.trim();
                                return (
                                    <li
                                        key={item.id}
                                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 pl-1 pr-2 py-1"
                                    >
                                        <Link
                                            to={`/equipment/${item.id}`}
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white hover:text-brand-red transition-colors"
                                        >
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt=""
                                                    className="w-7 h-7 object-cover rounded-sm"
                                                />
                                            ) : null}
                                            <span className="max-w-[10rem] truncate">
                                                {label || 'Unit'}
                                            </span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => remove(item.id)}
                                            className="text-white/60 hover:text-white p-1"
                                            aria-label={`Remove ${label} from compare`}
                                        >
                                            <X size={12} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={clear}
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/65 hover:text-white px-3 py-2"
                            >
                                <Trash2 size={14} />
                                Clear
                            </button>
                            <Link
                                to="/compare"
                                className={`inline-flex items-center gap-2 px-4 py-2.5 font-bold uppercase tracking-[0.2em] text-xs transition-colors ${
                                    items.length >= 2
                                        ? 'bg-brand-red hover:bg-brand-red-dark text-white'
                                        : 'bg-white/10 text-white/55 cursor-not-allowed'
                                }`}
                                aria-disabled={items.length < 2}
                                onClick={(e) => {
                                    if (items.length < 2) e.preventDefault();
                                }}
                            >
                                Compare
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </motion.aside>
            ) : null}
        </AnimatePresence>
    );
};

export default CompareTray;
