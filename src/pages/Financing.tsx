import { Helmet } from 'react-helmet-async';
import { DollarSign, Calculator, ChevronRight } from 'lucide-react';

const Financing = () => {
    // ---------------------------------------------------------
    // TODO: PLUG IN YOUR FINANCING LINKS HERE ONCE YOU GET THEM
    // ---------------------------------------------------------
    const financingOptions = [
        {
            providerName: "Financing Provider 1",
            description: "Flexible terms and competitive rates for all your equipment needs.",
            applyLink: "#", // Replace '#' with the actual link when you receive it
        },
        {
            providerName: "Financing Provider 2",
            description: "Quick approval process and low money down options available.",
            applyLink: "#", // Replace '#' with the actual link when you receive it
        },
        {
            providerName: "Financing Provider 3",
            description: "Specialized agricultural financing and seasonal payment plans.",
            applyLink: "#", // Replace '#' with the actual link when you receive it
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
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 drop-shadow-lg">
                            Flexible <span className="text-brand-red">Financing.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed border-l-4 border-brand-red pl-4 shadow-sm">
                            We understand that investing in heavy-duty equipment is a significant commitment. That's why we offer powerful financing solutions to help you secure the machinery you need to get the job done right.
                        </p>
                    </div>
                </div>
            </div>

            {/* Financing Links Section */}
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-charcoal uppercase tracking-tight mb-4">Choose Your Provider</h2>
                    <p className="text-charcoal/60">
                        Select one of our trusted financing partners below to begin your application process. We've arranged competitive programs to ensure you get the best rates possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {financingOptions.map((option, index) => (
                        <div key={index} className="bg-white border border-charcoal/10 rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col group">
                            <div className="w-14 h-14 bg-brand-red/10 flex items-center justify-center rounded-full mb-6 transition-transform group-hover:scale-110">
                                <DollarSign className="text-brand-red" size={28} />
                            </div>
                            <h3 className="text-xl font-black text-charcoal uppercase tracking-tight mb-3 group-hover:text-brand-red transition-colors">{option.providerName}</h3>
                            <p className="text-charcoal/70 mb-8 flex-grow text-sm md:text-base leading-relaxed">
                                {option.description}
                            </p>
                            <a 
                                href={option.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-red text-white py-3 px-6 rounded-sm font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-charcoal hover:shadow-lg transition-all w-full"
                            >
                                Apply Now <ChevronRight size={18} />
                            </a>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-20 bg-gradient-to-r from-charcoal/5 to-transparent p-8 md:p-12 border-l-4 border-brand-red flex flex-col md:flex-row gap-8 items-center rounded-r-xl">
                    <div className="bg-white p-4 rounded-full shadow-lg shrink-0">
                        <Calculator className="text-brand-red" size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black uppercase text-charcoal tracking-tight mb-2">Need help estimating your payments?</h4>
                        <p className="text-charcoal/70 mb-4 max-w-2xl leading-relaxed">
                            Our sales team is ready to help you crunch the numbers. Give us a call or stop by the dealership, and we'll walk you through all your financing options to find the perfect fit for your budget.
                        </p>
                        <a href="tel:3184429010" className="text-brand-red font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-2">
                            Call Our Finance Experts <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financing;
