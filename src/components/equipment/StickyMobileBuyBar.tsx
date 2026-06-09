import { useEffect, useState } from 'react';
import { ChevronUp, MessageSquare } from 'lucide-react';

import { estimateMonthlyPayment, formatMoney, parsePriceNumber } from '../../utils/inventoryDerive';

type Props = {
    modelLabel: string;
    price: string | number | null | undefined;
};

const StickyMobileBuyBar = ({ modelLabel, price }: Props) => {
    const numericPrice = parsePriceNumber(price);
    const monthly = numericPrice ? estimateMonthlyPayment(numericPrice).monthly : null;

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Hide when within ~600px of bottom so it does not double up with the inline form / footer.
            const distanceFromBottom =
                document.documentElement.scrollHeight -
                (window.scrollY + window.innerHeight);
            setHidden(distanceFromBottom < 600 || window.scrollY < 320);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToQuote = () => {
        const target = document.getElementById('quote-form');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div
            aria-hidden={hidden}
            className={`lg:hidden fixed left-0 right-0 z-40 bg-charcoal text-white border-t border-white/10 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
                hidden ? 'translate-y-full' : 'translate-y-0'
            }`}
            style={{
                bottom: 0,
                paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)',
            }}
        >
            <div className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 truncate">
                        {modelLabel}
                    </p>
                    <p className="font-heading font-black tracking-tight text-lg leading-tight">
                        {numericPrice ? formatMoney(numericPrice) : 'Call for price'}
                        {monthly ? (
                            <span className="text-[12px] text-white/55 font-medium ml-2">
                                {formatMoney(monthly)}/mo
                            </span>
                        ) : null}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={scrollToQuote}
                    className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-5 py-3 min-h-12 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                >
                    <ChevronUp size={14} />
                    Get Quote
                </button>
                <a
                    href="sms://+13184429010"
                    aria-label="Text the team"
                    className="inline-flex items-center justify-center min-w-12 min-h-12 border border-white/30 hover:bg-white hover:text-charcoal text-white transition-colors"
                >
                    <MessageSquare size={16} />
                </a>
            </div>
        </div>
    );
};

export default StickyMobileBuyBar;
