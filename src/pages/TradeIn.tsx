import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Camera, Clock, ClipboardCheck, ShieldCheck } from 'lucide-react';

import PageHero from '../components/PageHero';
import { submitLead } from '../utils/submitLead';

type FormState = {
    make: string;
    model: string;
    year: string;
    hours: string;
    attachments: string;
    condition: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
};

const initialForm: FormState = {
    make: '',
    model: '',
    year: '',
    hours: '',
    attachments: '',
    condition: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
};

const TradeIn = () => {
    const [form, setForm] = useState<FormState>(initialForm);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string>('');

    const update = (key: keyof FormState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.contactName && !form.contactPhone && !form.contactEmail) {
            setStatus('error');
            setError('Please share at least your name, phone, or email so we can reply.');
            return;
        }

        setStatus('submitting');
        setError('');

        const summary = `Trade-in request for ${form.year} ${form.make} ${form.model} (${form.hours || 'hours unknown'}).`;
        const result = await submitLead({
            source: 'trade-in',
            name: form.contactName,
            phone: form.contactPhone,
            email: form.contactEmail,
            message: summary,
            payload: {
                make: form.make,
                model: form.model,
                year: form.year,
                hours: form.hours,
                attachments: form.attachments,
                condition: form.condition,
            },
        });

        if (result.ok) {
            setStatus('success');
            setForm(initialForm);
        } else {
            setStatus('error');
            setError(result.error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Trade-In Valuation | Red Dirt Tractors</title>
                <meta
                    name="description"
                    content="Request a trade-in valuation from Red Dirt Tractors. Send make, model, year, hours, condition, and photos for a fast dealership estimate."
                />
                <link rel="canonical" href="https://reddirt-tractors.com/trade-in" />
            </Helmet>

            <PageHero
                eyebrow="Trade-in valuation"
                title="Know what your iron is worth."
                subtitle="Send the basics now. A real person from our Alexandria store will review your machine, compare current demand, and follow up with next steps."
                imageSrc="/hero_inventory.png"
                imageAlt=""
            />

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        {status === 'success' ? (
                            <div className="bg-off-white border border-charcoal/10 p-10 md:p-14 rounded-sm text-center">
                                <ShieldCheck className="text-brand-red mx-auto mb-6" size={48} />
                                <h2 className="font-heading font-black uppercase tracking-tight text-3xl md:text-4xl text-charcoal mb-4">
                                    Got it. We will be in touch.
                                </h2>
                                <p className="text-charcoal/65 font-medium leading-relaxed mb-8 max-w-xl mx-auto">
                                    During business hours we aim to reply quickly. If you can text photos to
                                    318-442-9010 it speeds up the conversation.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="inline-flex items-center gap-2 border border-charcoal/30 hover:border-brand-red hover:text-brand-red px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors text-charcoal"
                                >
                                    Submit another machine
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={onSubmit}
                                className="bg-off-white border border-charcoal/10 p-6 md:p-10 rounded-sm"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Field label="Make" placeholder="TYM, Mahindra, John Deere..." value={form.make} onChange={update('make')} autoCapitalize="words" />
                                    <Field label="Model" placeholder="T574, 4540, 1025R..." value={form.model} onChange={update('model')} />
                                    <Field label="Year" placeholder="2021" value={form.year} onChange={update('year')} inputMode="numeric" />
                                    <Field label="Hours" placeholder="325" value={form.hours} onChange={update('hours')} inputMode="numeric" />
                                    <Textarea
                                        label="Attachments included"
                                        placeholder="Loader, box blade, cutter..."
                                        value={form.attachments}
                                        onChange={update('attachments')}
                                    />
                                    <Textarea
                                        label="Condition notes"
                                        placeholder="Tires, leaks, service history, cosmetic issues..."
                                        value={form.condition}
                                        onChange={update('condition')}
                                    />

                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <Field
                                            label="Your name"
                                            placeholder="First and last"
                                            value={form.contactName}
                                            onChange={update('contactName')}
                                            autoComplete="name"
                                            autoCapitalize="words"
                                        />
                                        <Field
                                            label="Phone"
                                            placeholder="318-555-0123"
                                            value={form.contactPhone}
                                            onChange={update('contactPhone')}
                                            autoComplete="tel"
                                            inputMode="tel"
                                            type="tel"
                                        />
                                        <Field
                                            label="Email"
                                            placeholder="you@example.com"
                                            value={form.contactEmail}
                                            onChange={update('contactEmail')}
                                            autoComplete="email"
                                            inputMode="email"
                                            autoCapitalize="off"
                                            spellCheck={false}
                                            type="email"
                                        />
                                    </div>
                                </div>

                                {status === 'error' ? (
                                    <p className="mt-6 text-sm font-medium text-brand-red">
                                        {error}
                                    </p>
                                ) : null}

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="inline-flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 font-bold uppercase tracking-[0.2em] text-sm transition-colors"
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Send valuation request'}
                                        <ArrowRight size={18} />
                                    </button>
                                    <a
                                        href="sms://+13184429010"
                                        className="inline-flex items-center justify-center border border-charcoal/20 hover:border-brand-red text-charcoal hover:text-brand-red px-8 py-4 font-bold uppercase tracking-[0.2em] text-sm transition-colors"
                                    >
                                        Text photos instead
                                    </a>
                                </div>

                                <p className="mt-5 text-xs text-charcoal/45 font-medium leading-relaxed">
                                    We respond during business hours. No spam, no robo-calls, just real
                                    people from our Alexandria store.
                                </p>
                            </form>
                        )}
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32 space-y-6">
                            {[
                                {
                                    icon: ClipboardCheck,
                                    title: 'What we check',
                                    copy: 'Make, model, year, hours, loader or attachment package, service history, tire condition, and local demand.',
                                },
                                {
                                    icon: Camera,
                                    title: 'Photos help',
                                    copy: 'Send all four sides, hour meter, serial plate, tires, bucket edge, and any damage or leaks.',
                                },
                                {
                                    icon: Clock,
                                    title: 'Fast follow-up',
                                    copy: 'During business hours, we aim to respond quickly with a realistic range and next-step conversation.',
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'No pressure',
                                    copy: 'Use the number to trade up, consign, sell outright, or decide whether to keep running what you have.',
                                },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="bg-charcoal text-white p-6 md:p-8 rounded-sm">
                                        <Icon className="text-brand-red mb-5" size={26} />
                                        <h2 className="font-heading font-black uppercase tracking-tight text-xl mb-3">
                                            {item.title}
                                        </h2>
                                        <p className="text-white/65 font-medium leading-relaxed">
                                            {item.copy}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </section>
        </>
    );
};

type FieldProps = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
    autoComplete?: string;
    autoCapitalize?: string;
    inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'none';
    spellCheck?: boolean;
};

const Field = ({
    label,
    placeholder,
    value,
    onChange,
    type = 'text',
    autoComplete,
    autoCapitalize,
    inputMode,
    spellCheck,
}: FieldProps) => (
    <label className="block">
        <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/50 mb-2">
            {label}
        </span>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            inputMode={inputMode}
            spellCheck={spellCheck}
            className="w-full bg-white border border-charcoal/10 px-4 py-3 min-h-12 text-sm font-medium text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-brand-red"
        />
    </label>
);

const Textarea = ({
    label,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
    <label className="block md:col-span-2">
        <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/50 mb-2">
            {label}
        </span>
        <textarea
            value={value}
            onChange={onChange}
            rows={3}
            placeholder={placeholder}
            className="w-full bg-white border border-charcoal/10 px-4 py-3 text-sm font-medium text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-brand-red"
        />
    </label>
);

export default TradeIn;
