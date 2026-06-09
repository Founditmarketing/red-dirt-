import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { useSaved } from '../context/SavedContext';
import type { LiveInventoryItem } from '../context/InventoryContext';

type Props = {
    item: LiveInventoryItem;
    /** "card" sits absolutely-positioned on a tractor card (top-right). "inline" is a normal inline button. */
    variant?: 'card' | 'inline';
    className?: string;
};

const SaveButton = ({ item, variant = 'card', className = '' }: Props) => {
    const { isSaved, toggle } = useSaved();
    const saved = isSaved(item.id);

    const baseClasses =
        variant === 'card'
            ? 'absolute top-3 right-3 z-30 inline-flex items-center justify-center w-10 h-10 backdrop-blur-sm transition-colors'
            : 'inline-flex items-center justify-center w-11 h-11 transition-colors';

    const saveClasses = saved
        ? variant === 'card'
            ? 'bg-brand-red text-white border border-brand-red'
            : 'bg-brand-red text-white border border-brand-red'
        : variant === 'card'
            ? 'bg-white/85 hover:bg-white text-charcoal border border-white/30'
            : 'bg-white text-charcoal border border-charcoal/15 hover:border-brand-red hover:text-brand-red';

    return (
        <button
            type="button"
            aria-label={saved ? 'Remove from saved' : 'Save this unit'}
            aria-pressed={saved}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(item);
            }}
            className={`${baseClasses} ${saveClasses} ${className}`}
        >
            <motion.span
                key={String(saved)}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="inline-flex"
            >
                <Heart size={18} fill={saved ? 'currentColor' : 'none'} strokeWidth={saved ? 1 : 2} />
            </motion.span>
        </button>
    );
};

export default SaveButton;
