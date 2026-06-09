import { Helmet } from 'react-helmet-async';
import { DollarSign, Calculator, ChevronRight, MessageSquare, Phone, Landmark } from 'lucide-react';

import PaymentEstimator from '../components/PaymentEstimator';

const Financing = () => {
    const financingOptions = [
        {
            providerName: "Mahindra Finance",
            brandName: "Mahindra",
            logoUrl: "/brands/mahindralogo.webp",
            description: "Dedicated financing options tailored specifically for your new Mahindra equipment.",
            applyLinks: [{ name: "Apply Now", url: "https://applynow-cica-prd.mahindrafinanceusa.com/?entityId=3&dealerCode=13276" }],
        },
        {
            providerName: "DLL Finance",
            brandName: "TYM Tractors",
            logoUrl: "/brands/tymlogo.png",
            description: "Flexible terms and competitive rates for all your TYM Tractor needs.",
            applyLinks: [{ name: "Apply Now", url: "https://applynow-cica-prd.dllgroup.com/?entityid=2&dealerCode=013276" }],
        },
        {
            providerName: "Sheffield & Synchrony",
            brandName: "Ferris",
            logoUrl: "/brands/ferrislogo.webp",
            description: "Quick approval processes and multiple options available for Ferris mowers.",
            applyLinks: [
                { name: "Apply with Sheffield", url: "https://prequalify.sheffieldfinancial.com/Apply/Dealer/48349?source=web" },
                { name: "Apply with Synchrony", url: "https://www.mysynchrony.com/mmc/PC239787290" }
            ],
        },
        {
            providerName: "Vibrant Equipment Lending",
            brandName: "Wacker Neuson",
            logoUrl: "/brands/Wacker_Neuson_Logo.png",
            description: "Specialized construction equipment financing and seasonal payment plans.",
            applyLinks: [{ name: "Apply Now", url: "https://preapproval-wackerneuson.vibrantequipmentlending.com//main#/entity/FTOS_BNKAP_RetailApplicantData/insert/form/VIB_B2C_CustomerDataCollect/buid=63c77439-6c38-49fe-aa27-6610fe47b50a" }],
        },
        {
            providerName: "Custom Financing",
            brandName: "Implements, Trailers & More",
            logoUrl: null, // We'll just show the generic icon if no logo
            description: "Rates and terms vary for implements and trailers. Send us a text for a custom quote and finance options.",
            applyLinks: [{ name: "Contact Us", url: "sms:3184429010" }],
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-16">
            <Helmet>
                <title>Equipment Financing | Red Dirt Tractors</title>
                <meta name="description" content="Apply for financing for your new or pre-owned tractors and construction equipment at Red Dirt Tractors." />
            </Helmet>

            {/* Hero Section */}
            <div className="bg-charcoal text-white pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden mb-16 shadow-lg border-b-4 border-brand-red/20">
                <div className="absolute inset-0 z-0 opacity-20">
                     <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/20 to-transparent pointer-events-none z-[1]"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                        <div className="lg:col-span-7">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 drop-shadow-lg">
                                Flexible <span className="text-brand-red">Financing.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/75 font-medium leading-relaxed max-w-2xl">
                                Investing in heavy-duty equipment is a real commitment. We work with major brand finance partners so the conversation stays transparent and the paperwork moves fast.
                            </p>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="bg-white/5 border border-white/15 p-6 md:p-7 rounded-sm">
                                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-3">
                                    Apply in minutes
                                </p>
                                <h2 className="font-heading font-black uppercase tracking-tight text-2xl md:text-3xl leading-tight mb-4">
                                    Fast approvals, real rates.
                                </h2>
                                <p className="text-white/65 font-medium leading-relaxed text-sm md:text-base mb-6">
                                    Pick the brand that matches your equipment and apply directly with our lending partners, or text us and we will help match you to the right one.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#providers"
                                        className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-5 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                    >
                                        Choose a lender
                                        <ChevronRight size={14} />
                                    </a>
                                    <a
                                        href="sms://+13184429010"
                                        className="inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-charcoal px-5 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                                    >
                                        <MessageSquare size={14} />
                                        Text us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financing Links Section */}
            <div id="providers" className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-charcoal uppercase tracking-tight mb-4">Choose Your Provider</h2>
                    <p className="text-charcoal/60">
                        Select one of our trusted financing partners below to begin your application process. We've arranged competitive programs to ensure you get the best rates possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {financingOptions.map((option, index) => (
                        <div key={index} className="bg-white border border-charcoal/10 rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col group">
                            <div className="h-20 flex items-center justify-start mb-6">
                                {option.logoUrl ? (
                                    <img src={option.logoUrl} alt={`${option.brandName} Logo`} className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <div className="w-14 h-14 bg-brand-red/10 flex items-center justify-center rounded-full transition-transform group-hover:scale-110">
                                        <DollarSign className="text-brand-red" size={28} />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-black text-charcoal uppercase tracking-tight mb-1 group-hover:text-brand-red transition-colors">{option.brandName}</h3>
                            <p className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-3">{option.providerName}</p>
                            <p className="text-charcoal/70 mb-8 flex-grow text-sm md:text-base leading-relaxed">
                                {option.description}
                            </p>
                            <div className="flex flex-col gap-3 w-full">
                                {option.applyLinks.map((link, linkIdx) => (
                                    <a 
                                        key={linkIdx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`py-3 px-6 rounded-sm font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all w-full ${linkIdx === 0 ? 'bg-brand-red text-white hover:bg-charcoal hover:shadow-lg' : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'}`}
                                    >
                                        {link.name} <ChevronRight size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bring Your Own Financing */}
                <div className="mt-12 bg-off-white border border-charcoal/10 p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    <div className="bg-charcoal text-white p-4 rounded-sm shrink-0">
                        <Landmark size={28} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-3">
                            Already have a lender?
                        </p>
                        <h4 className="font-heading font-black uppercase text-charcoal tracking-tight text-2xl md:text-3xl mb-3 leading-tight">
                            Bring your own financing.
                        </h4>
                        <p className="text-charcoal/70 mb-5 max-w-2xl leading-relaxed">
                            Already working with your bank or credit union? No problem. Put us in contact with your lender and we will get them everything they need to hand you the check. We work with any institution.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="tel:3184429010" className="inline-flex items-center gap-2 bg-charcoal text-white hover:bg-brand-red px-5 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors">
                                <Phone size={14} />
                                Call 318-442-9010
                            </a>
                            <a href="sms://+13184429010" className="inline-flex items-center gap-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-5 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors">
                                <MessageSquare size={14} />
                                Text us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Payment Estimator */}
                <div className="mt-12 max-w-xl mx-auto">
                    <PaymentEstimator price={35000} modelLabel="average equipment" />
                </div>

                {/* Talk to a Human */}
                <div className="mt-12 bg-charcoal text-white p-8 md:p-14 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                    <div className="bg-brand-red text-white p-5 shrink-0">
                        <Calculator size={28} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-red mb-3">
                            Talk to a human
                        </p>
                        <h4 className="font-heading font-black uppercase text-white tracking-tight text-2xl md:text-3xl mb-3 leading-tight">
                            Need help deciding?
                        </h4>
                        <p className="text-white/70 mb-5 max-w-2xl leading-relaxed">
                            Our sales team is ready to walk you through every option. Call, text, or stop by the dealership — we will help you find the right fit for your budget.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a href="tel:3184429010" className="text-white font-bold uppercase tracking-[0.25em] text-sm border-b border-white pb-1 hover:text-brand-red hover:border-brand-red inline-flex items-center gap-2 transition-colors">
                                <Phone size={14} />
                                Call us
                            </a>
                            <a href="sms://+13184429010" className="text-white font-bold uppercase tracking-[0.25em] text-sm border-b border-white pb-1 hover:text-brand-red hover:border-brand-red inline-flex items-center gap-2 transition-colors">
                                <MessageSquare size={14} />
                                Text us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financing;
