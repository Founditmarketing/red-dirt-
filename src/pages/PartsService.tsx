import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Wrench, Settings, Phone, ChevronRight } from 'lucide-react';
import { submitLead } from '../utils/submitLead';

type FormState = {
    name: string;
    phone: string;
    equipment: string;
    issue: string;
};

const initialForm: FormState = { name: '', phone: '', equipment: '', issue: '' };

const PartsService = () => {
    const [form, setForm] = useState<FormState>(initialForm);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const update = (key: keyof FormState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name && !form.phone) {
            setStatus('error');
            setError('Please provide your name and phone number so we can reach you.');
            return;
        }
        setStatus('submitting');
        setError('');
        const result = await submitLead({
            source: 'parts-service',
            name: form.name,
            phone: form.phone,
            message: form.issue || `Service request for ${form.equipment}`.trim(),
            payload: { equipment: form.equipment, issue: form.issue },
        });
        if (result.ok) {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({ event: 'lead_submitted', form_source: 'parts-service' });
            setStatus('success');
            setForm(initialForm);
        } else {
            setStatus('error');
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-off-white">
            <Helmet>
                <title>Parts &amp; Service | Red Dirt Tractors in Alexandria, LA</title>
                <meta
                    name="description"
                    content="Schedule certified service or order genuine parts for TYM, Mahindra, Ferris, Wacker Neuson, Load Trail, East Texas, Woods, Premier, Baumalight, and Sidewinder equipment. In-shop repair available from our Hwy 71 South store."
                />
                <link rel="canonical" href="https://reddirt-tractors.com/parts-service" />
            </Helmet>
            
            {/* Cinematic Service Header */}
            <section className="relative h-[50vh] md:h-[50vh] flex items-center bg-charcoal overflow-hidden pt-20 md:pt-28">
                 <div className="absolute inset-0 z-0 opacity-40">
                     {/* Temporarily using the hero image as background or a dark gradient if unvailable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-brand-red/20 z-10" />
                    <img src="/hero_parts_service.png" alt="Service Bay Background" className="w-full h-full object-cover" />
                 </div>

                 <div className="container mx-auto px-4 md:px-6 relative z-20">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                     >
                         <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 md:mb-6 leading-none">
                             Heavy duty service.
                             <br />
                             Genuine <span className="text-brand-red">parts.</span>
                         </h1>
                         <p className="text-base md:text-xl text-white/75 font-medium max-w-2xl leading-relaxed">
                             Maximum uptime is our priority. Our certified technicians stock most maintenance parts and can order what you need fast.
                         </p>
                     </motion.div>
                 </div>
            </section>

            {/* Main Content Area */}
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Left Column: Service Request Form (The Revenue Driver) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 md:p-12 shadow-xl border-t-4 border-brand-red">
                            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                <div className="p-2 md:p-3 bg-brand-red/10 rounded-full shrink-0">
                                    <Wrench className="text-brand-red w-6 h-6 md:w-7 md:h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">Schedule Service</h2>
                                    <p className="text-charcoal/60 font-medium mt-1 text-sm md:text-base">Bring it in — we'll take care of the rest.</p>
                                </div>
                            </div>

                            {status === 'success' ? (
                                <div className="py-12 text-center">
                                    <p className="text-2xl font-black uppercase tracking-tight text-charcoal mb-3">Request received.</p>
                                    <p className="text-charcoal/60 font-medium mb-6">We will be in touch during business hours.</p>
                                    <button type="button" onClick={() => setStatus('idle')} className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red hover:underline">Submit another request</button>
                                </div>
                            ) : (
                            <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {/* Floating Label Style Inputs */}
                                    <div className="relative pt-2">
                                        <input type="text" id="name" value={form.name} onChange={update('name')} autoComplete="name" autoCapitalize="words" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Full Name" />
                                        <label htmlFor="name" className="absolute left-0 -top-1.5 text-xs md:text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 hover:cursor-text peer-focus:-top-1.5 peer-focus:text-brand-red peer-focus:text-xs">Full Name</label>
                                    </div>
                                    <div className="relative pt-2">
                                        <input type="tel" id="phone" value={form.phone} onChange={update('phone')} autoComplete="tel" inputMode="tel" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Phone Number" />
                                        <label htmlFor="phone" className="absolute left-0 -top-1.5 text-xs md:text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 hover:cursor-text peer-focus:-top-1.5 peer-focus:text-brand-red peer-focus:text-xs">Phone Number</label>
                                    </div>
                                    <div className="relative md:col-span-2 pt-2">
                                        <input type="text" id="equipment" value={form.equipment} onChange={update('equipment')} className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Equipment Make & Model" />
                                        <label htmlFor="equipment" className="absolute left-0 -top-1.5 text-xs md:text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-4 hover:cursor-text peer-focus:-top-1.5 peer-focus:text-brand-red peer-focus:text-xs">Equipment Make & Model</label>
                                    </div>
                                    <div className="relative md:col-span-2 pt-2">
                                        <textarea id="issue" rows={4} value={form.issue} onChange={update('issue')} className="peer w-full border-2 border-charcoal/10 rounded-sm bg-off-white p-4 text-charcoal focus:outline-none focus:border-brand-red focus:bg-white transition-colors placeholder-transparent resize-none mt-2" placeholder="Describe the Issue"></textarea>
                                        <label htmlFor="issue" className="absolute left-4 top-0 text-xs md:text-sm font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm md:peer-placeholder-shown:text-base peer-placeholder-shown:top-6 hover:cursor-text peer-focus:top-0 peer-focus:text-brand-red peer-focus:text-xs bg-white px-2">Describe the Issue</label>
                                    </div>
                                </div>
                                {status === 'error' ? (
                                    <p className="text-sm font-medium text-brand-red">{error}</p>
                                ) : null}
                                <button type="submit" disabled={status === 'submitting'} className="group bg-brand-red text-white px-6 md:px-8 py-4 w-full rounded-sm font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-red-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(227,24,55,0.2)] hover:shadow-[0_0_40px_rgba(227,24,55,0.4)] mt-4 md:mt-8">
                                    <span>{status === 'submitting' ? 'Sending...' : 'Submit Service Request'}</span>
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
                                </button>
                            </form>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Parts & Trust Signals */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Parts Counter Card */}
                        <div className="bg-charcoal text-white p-6 md:p-8 rounded-sm shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-brand-red/10 rounded-full blur-2xl md:blur-3xl -mr-6 -mt-6 md:-mr-10 md:-mt-10 pointer-events-none group-hover:bg-brand-red/20 transition-all"></div>
                            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                <Settings className="text-brand-red w-6 h-6 md:w-7 md:h-7" />
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Parts Lookup</h3>
                            </div>
                            <p className="opacity-80 mb-6 font-medium leading-relaxed text-sm md:text-base">Need a specific filter, belt, or hydraulic fitting? Call our dedicated parts counter directly.</p>
                            <a href="tel:3184429010" className="flex items-center justify-center gap-2 md:gap-3 bg-white text-charcoal hover:bg-brand-red hover:text-white px-6 py-3 md:py-4 font-bold uppercase tracking-widest transition-all w-full text-sm md:text-base">
                                <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                                <span>(318) 442-9010</span>
                            </a>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
};

export default PartsService;
