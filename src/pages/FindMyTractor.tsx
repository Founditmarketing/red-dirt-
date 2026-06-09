import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';
import { submitLead } from '../utils/submitLead';

type Choice = {
    id: string;
    label: string;
    detail?: string;
};

type Question = {
    id: string;
    prompt: string;
    helper?: string;
    choices: Choice[];
};

const QUESTIONS: Question[] = [
    {
        id: 'acreage',
        prompt: 'How much land are you working?',
        helper: 'Be honest. Smaller acreage is fine, oversized iron just wastes money.',
        choices: [
            { id: 'small', label: 'Under 5 acres', detail: 'Yard, food plot, small pasture' },
            { id: 'medium', label: '5 to 25 acres', detail: 'Hobby farm, large estate' },
            { id: 'large', label: '25 to 100 acres', detail: 'Working farm, large pasture' },
            { id: 'xl', label: '100+ acres', detail: 'Commercial operation' },
        ],
    },
    {
        id: 'job',
        prompt: 'What is the main job?',
        choices: [
            { id: 'mowing', label: 'Mowing and brush cutting' },
            { id: 'loader', label: 'Loader work and grading' },
            { id: 'hay', label: 'Hay, baling, pasture work' },
            { id: 'mixed', label: 'A bit of everything' },
        ],
    },
    {
        id: 'comfort',
        prompt: 'Cab or open station?',
        helper: 'Cabs add comfort, climate, and cost. Open stations are simpler and lighter.',
        choices: [
            { id: 'open', label: 'Open station' },
            { id: 'cab', label: 'Cab with heat and A/C' },
            { id: 'either', label: 'No preference, recommend what fits' },
        ],
    },
    {
        id: 'horsepower',
        prompt: 'Any feel for horsepower?',
        helper: 'If you are not sure, pick the closest job size. We will translate.',
        choices: [
            { id: 'small', label: '20-30 HP' },
            { id: 'mid', label: '30-50 HP' },
            { id: 'large', label: '50-75 HP' },
            { id: 'unknown', label: 'Not sure yet' },
        ],
    },
    {
        id: 'budget',
        prompt: 'What budget are you working with?',
        choices: [
            { id: 'under-25k', label: 'Under $25k' },
            { id: '25-40k', label: '$25k to $40k' },
            { id: '40-60k', label: '$40k to $60k' },
            { id: '60k+', label: '$60k or more' },
        ],
    },
    {
        id: 'timeline',
        prompt: 'When do you want to be running?',
        choices: [
            { id: 'now', label: 'As soon as possible' },
            { id: 'month', label: 'Within a month' },
            { id: 'quarter', label: 'Next 1-3 months' },
            { id: 'browsing', label: 'Just researching for now' },
        ],
    },
];

type Answers = Record<string, string>;

type Recommendation = {
    title: string;
    blurb: string;
    bullets: string[];
};

const recommend = (answers: Answers): Recommendation[] => {
    const acreage = answers.acreage || 'medium';
    const job = answers.job || 'mixed';
    const comfort = answers.comfort || 'either';

    if (acreage === 'small') {
        return [
            {
                title: 'TYM 2515H Compact',
                blurb: 'A 25 HP compact tractor that handles small acreage chores without becoming overkill.',
                bullets: [
                    'Hydrostatic drive for easy operation',
                    'Loader compatible for grading and material handling',
                    'Right size for storage and trailering',
                ],
            },
            {
                title: 'Mahindra eMax 22',
                blurb: 'A simple, dependable subcompact that fits tight spaces and modest budgets.',
                bullets: [
                    'Easy on the wallet',
                    'Strong dealer support',
                    'Great first tractor for new landowners',
                ],
            },
        ];
    }

    if (acreage === 'large' || acreage === 'xl') {
        return [
            {
                title: comfort === 'cab' ? 'TYM T574 Cab Utility' : 'TYM T574 Open Station',
                blurb: 'A 55+ HP class workhorse that stands up to real acreage and serious implements.',
                bullets: [
                    'Heavier frame for loader and ground-engaging work',
                    'Ideal for cutting, hauling, and grading',
                    'Cab option for year-round comfort',
                ],
            },
            {
                title: 'Mahindra 4540 Utility',
                blurb: 'A heavy-built 40+ HP tractor for owners who want mass and serviceability.',
                bullets: [
                    'Strong utility chassis',
                    'Loader compatible',
                    'Built for steady, long-term use',
                ],
            },
        ];
    }

    if (job === 'mowing') {
        return [
            {
                title: 'Ferris ISX Series Zero-Turn',
                blurb: 'When mowing is the main job, a commercial zero-turn is faster and easier than running a tractor and finish mower.',
                bullets: [
                    'Commercial-grade suspension',
                    'Wide deck options for acreage',
                    'Built for fleet-level reliability',
                ],
            },
            {
                title: 'TYM Compact + Rotary Cutter',
                blurb: 'If you also need loader work, a compact tractor with a rotary cutter handles mowing plus everything else.',
                bullets: [
                    'Versatile across mowing and chores',
                    'Pair with implements as needs grow',
                    'Holds value better than dedicated mowers',
                ],
            },
        ];
    }

    return [
        {
            title: 'TYM Mid-Frame Compact',
            blurb: 'A balanced 30-45 HP class compact that handles mixed acreage work without compromise.',
            bullets: [
                'Right size for hobby and working farms',
                'Strong loader package options',
                'Cab or open station available',
            ],
        },
        {
            title: 'Mahindra Mid-Utility',
            blurb: 'A heavier feel with simple controls for owners who repeat the same chores year over year.',
            bullets: [
                'Heavy-built chassis',
                'Service-friendly design',
                'Strong dealer warranty support',
            ],
        },
    ];
};

const FindMyTractor = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [contact, setContact] = useState({ name: '', phone: '', email: '' });
    const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [submitError, setSubmitError] = useState('');

    const finished = step >= QUESTIONS.length;
    const recommendations = useMemo(() => recommend(answers), [answers]);
    const progress = Math.min(100, Math.round((step / QUESTIONS.length) * 100));

    const choose = (questionId: string, choiceId: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
        setStep((prev) => prev + 1);
    };

    const back = () => setStep((prev) => Math.max(0, prev - 1));

    const restart = () => {
        setStep(0);
        setAnswers({});
        setContact({ name: '', phone: '', email: '' });
        setSubmitState('idle');
        setSubmitError('');
    };

    const sendToTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contact.name && !contact.phone && !contact.email) {
            setSubmitState('error');
            setSubmitError('Add at least one way to reach you (name, phone, or email).');
            return;
        }

        setSubmitState('submitting');
        const result = await submitLead({
            source: 'find-my-tractor',
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            message: 'Find My Tractor quiz results submitted from website.',
            payload: {
                answers,
                recommendations: recommendations.map((r) => r.title),
            },
        });

        if (result.ok) {
            setSubmitState('success');
        } else {
            setSubmitState('error');
            setSubmitError(result.error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Find My Tractor | Red Dirt Tractors</title>
                <meta
                    name="description"
                    content="Answer six quick questions and our team will recommend two or three tractors that fit your acreage, jobs, and budget."
                />
                <link rel="canonical" href="https://reddirt-tractors.com/find-my-tractor" />
            </Helmet>

            <PageHero
                eyebrow="Tractor matchmaker"
                title="Six questions. Two real recommendations."
                subtitle="No spam, no fake listings. Just acreage and job-based suggestions from our team that you can act on or ignore."
                imageSrc="/hero_inventory.png"
                imageAlt=""
            />

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    {!finished ? (
                        <div>
                            <div className="flex items-center justify-between mb-10">
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-charcoal/45">
                                    Step {step + 1} of {QUESTIONS.length}
                                </p>
                                <button
                                    type="button"
                                    onClick={restart}
                                    className="text-xs font-bold uppercase tracking-[0.25em] text-charcoal/45 hover:text-brand-red transition-colors"
                                >
                                    Restart
                                </button>
                            </div>

                            <div className="h-1 w-full bg-charcoal/10 mb-12 overflow-hidden">
                                <div
                                    className="h-full bg-brand-red transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <h2 className="font-heading font-black uppercase tracking-tight text-3xl md:text-4xl text-charcoal leading-tight mb-4">
                                {QUESTIONS[step].prompt}
                            </h2>
                            {QUESTIONS[step].helper ? (
                                <p className="text-charcoal/60 font-medium leading-relaxed mb-8">
                                    {QUESTIONS[step].helper}
                                </p>
                            ) : (
                                <div className="mb-4" />
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {QUESTIONS[step].choices.map((choice) => (
                                    <button
                                        key={choice.id}
                                        type="button"
                                        onClick={() => choose(QUESTIONS[step].id, choice.id)}
                                        className="text-left bg-off-white border border-charcoal/10 hover:border-brand-red hover:bg-white transition-colors p-6 group"
                                    >
                                        <p className="font-heading font-black uppercase tracking-tight text-charcoal text-lg mb-1 group-hover:text-brand-red transition-colors">
                                            {choice.label}
                                        </p>
                                        {choice.detail ? (
                                            <p className="text-sm text-charcoal/55 font-medium">
                                                {choice.detail}
                                            </p>
                                        ) : null}
                                    </button>
                                ))}
                            </div>

                            {step > 0 ? (
                                <button
                                    type="button"
                                    onClick={back}
                                    className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-charcoal/55 hover:text-brand-red transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                    Back
                                </button>
                            ) : null}
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="text-brand-red" size={22} />
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
                                    Your matches
                                </p>
                            </div>
                            <h2 className="font-heading font-black uppercase tracking-tight text-3xl md:text-4xl text-charcoal leading-tight mb-10">
                                Based on what you told us, start here.
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {recommendations.map((rec) => (
                                    <div
                                        key={rec.title}
                                        className="bg-off-white border border-charcoal/10 p-7 rounded-sm flex flex-col"
                                    >
                                        <h3 className="font-heading font-black uppercase tracking-tight text-2xl text-charcoal mb-3">
                                            {rec.title}
                                        </h3>
                                        <p className="text-charcoal/65 font-medium leading-relaxed mb-6">
                                            {rec.blurb}
                                        </p>
                                        <ul className="space-y-2 mb-6">
                                            {rec.bullets.map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="text-sm text-charcoal/70 font-medium flex gap-3"
                                                >
                                                    <span className="text-brand-red font-bold">+</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            to="/inventory"
                                            className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-red"
                                        >
                                            Browse similar inventory
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {submitState === 'success' ? (
                                <div className="bg-charcoal text-white p-8 md:p-10 rounded-sm">
                                    <h3 className="font-heading font-black uppercase tracking-tight text-2xl md:text-3xl mb-3">
                                        Thanks. We will follow up.
                                    </h3>
                                    <p className="text-white/70 font-medium leading-relaxed">
                                        Our team will reach out during business hours to talk through fit,
                                        availability, and financing.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-4">
                                        <Link
                                            to="/inventory"
                                            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                        >
                                            Browse inventory
                                            <ArrowRight size={16} />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={restart}
                                            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-charcoal px-6 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                        >
                                            Run quiz again
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    onSubmit={sendToTeam}
                                    className="bg-charcoal text-white p-8 md:p-10 rounded-sm"
                                >
                                    <h3 className="font-heading font-black uppercase tracking-tight text-2xl md:text-3xl mb-3">
                                        Send these to my salesperson.
                                    </h3>
                                    <p className="text-white/65 font-medium leading-relaxed mb-7">
                                        We will look at your answers, check live stock, and reply with two
                                        or three real options plus pricing context.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            value={contact.name}
                                            onChange={(e) =>
                                                setContact((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            placeholder="Name"
                                            autoComplete="name"
                                            autoCapitalize="words"
                                            enterKeyHint="next"
                                            className="bg-white/5 border border-white/15 hover:border-white/30 focus:border-brand-red px-4 py-3 min-h-12 text-sm text-white placeholder:text-white/40 focus:outline-none"
                                        />
                                        <input
                                            type="tel"
                                            value={contact.phone}
                                            onChange={(e) =>
                                                setContact((prev) => ({ ...prev, phone: e.target.value }))
                                            }
                                            placeholder="Phone"
                                            autoComplete="tel"
                                            inputMode="tel"
                                            enterKeyHint="next"
                                            className="bg-white/5 border border-white/15 hover:border-white/30 focus:border-brand-red px-4 py-3 min-h-12 text-sm text-white placeholder:text-white/40 focus:outline-none"
                                        />
                                        <input
                                            type="email"
                                            value={contact.email}
                                            onChange={(e) =>
                                                setContact((prev) => ({ ...prev, email: e.target.value }))
                                            }
                                            placeholder="Email"
                                            autoComplete="email"
                                            inputMode="email"
                                            autoCapitalize="off"
                                            spellCheck={false}
                                            enterKeyHint="send"
                                            className="bg-white/5 border border-white/15 hover:border-white/30 focus:border-brand-red px-4 py-3 min-h-12 text-sm text-white placeholder:text-white/40 focus:outline-none"
                                        />
                                    </div>

                                    {submitState === 'error' ? (
                                        <p className="mt-5 text-sm font-medium text-brand-red">
                                            {submitError}
                                        </p>
                                    ) : null}

                                    <div className="mt-7 flex flex-wrap gap-4">
                                        <button
                                            type="submit"
                                            disabled={submitState === 'submitting'}
                                            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs text-white transition-colors"
                                        >
                                            {submitState === 'submitting' ? 'Sending...' : 'Send to my salesperson'}
                                            <ArrowRight size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={restart}
                                            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-charcoal px-7 py-3 font-bold uppercase tracking-[0.2em] text-xs text-white transition-colors"
                                        >
                                            Run quiz again
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default FindMyTractor;
