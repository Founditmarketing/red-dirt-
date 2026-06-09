import { useState } from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

import { submitLead } from '../../utils/submitLead';

interface QuoteFormProps {
    modelName: string;
}

const QuoteForm = ({ modelName }: QuoteFormProps) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [wantsFinancing, setWantsFinancing] = useState(false);
    const [hasTrade, setHasTrade] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name && !phone && !email) {
            setStatus('error');
            setError('Add a name, phone, or email so we can reply.');
            return;
        }

        setStatus('submitting');
        const result = await submitLead({
            source: 'equipment-quote',
            name,
            phone,
            email,
            message: `Quote request for ${modelName}.`,
            payload: {
                model: modelName,
                wantsFinancing,
                hasTrade,
            },
        });

        if (result.ok) {
            setStatus('success');
            setName('');
            setPhone('');
            setEmail('');
            setWantsFinancing(false);
            setHasTrade(false);
        } else {
            setStatus('error');
            setError(result.error);
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white p-7 md:p-9 border-t-4 border-brand-red shadow-2xl relative lg:sticky lg:top-32 text-center">
                <ShieldCheck className="text-brand-red mx-auto mb-4" size={36} />
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">
                    Quote request sent.
                </h3>
                <p className="text-charcoal/65 font-medium text-sm leading-relaxed mb-5">
                    Our team will reach out during business hours with pricing, financing options,
                    and availability for the {modelName}.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red hover:underline"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-8 border-t-4 border-brand-red shadow-2xl relative lg:sticky lg:top-32">
            <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Request a Quote</h3>
                <p className="text-charcoal/60 font-medium text-xs md:text-sm mt-1">Get custom pricing for the {modelName}</p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        id="quote-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        autoCapitalize="words"
                        enterKeyHint="next"
                        className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent"
                        placeholder="Full Name"
                    />
                    <label htmlFor="quote-name" className="absolute left-0 -top-3.5 text-xs font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-xs">Full Name</label>
                </div>

                <div className="relative">
                    <input
                        type="tel"
                        id="quote-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        inputMode="tel"
                        enterKeyHint="next"
                        className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent"
                        placeholder="Phone Number"
                    />
                    <label htmlFor="quote-phone" className="absolute left-0 -top-3.5 text-xs font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-xs">Phone Number</label>
                </div>

                <div className="relative">
                    <input
                        type="email"
                        id="quote-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        inputMode="email"
                        enterKeyHint="send"
                        className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent"
                        placeholder="Email Address"
                    />
                    <label htmlFor="quote-email" className="absolute left-0 -top-3.5 text-xs font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-xs">Email Address</label>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="financing"
                        checked={wantsFinancing}
                        onChange={(e) => setWantsFinancing(e.target.checked)}
                        className="w-4 h-4 md:w-5 md:h-5 accent-brand-red cursor-pointer"
                    />
                    <label htmlFor="financing" className="text-xs md:text-sm font-bold uppercase tracking-wide text-charcoal/70 cursor-pointer">I am interested in financing</label>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="trade"
                        checked={hasTrade}
                        onChange={(e) => setHasTrade(e.target.checked)}
                        className="w-4 h-4 md:w-5 md:h-5 accent-brand-red cursor-pointer"
                    />
                    <label htmlFor="trade" className="text-xs md:text-sm font-bold uppercase tracking-wide text-charcoal/70 cursor-pointer">I have a trade-in</label>
                </div>

                {status === 'error' ? (
                    <p className="text-sm font-medium text-brand-red">{error}</p>
                ) : null}

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group bg-brand-red text-white px-6 md:px-8 py-4 w-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-red-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-6 md:mt-8"
                >
                    <span>{status === 'submitting' ? 'Sending...' : 'Get Pricing Options'}</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
                </button>

                <p className="text-[11px] text-charcoal/50 font-medium leading-relaxed">
                    No spam, no robo-calls. We respond during business hours from our Alexandria store.
                </p>
            </form>
        </div>
    );
};

export default QuoteForm;
