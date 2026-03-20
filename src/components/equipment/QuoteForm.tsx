import { ChevronRight } from 'lucide-react';

interface QuoteFormProps {
    modelName: string;
}

const QuoteForm = ({ modelName }: QuoteFormProps) => {
    return (
        <div className="bg-white p-6 md:p-8 border-t-4 border-brand-red shadow-2xl relative lg:sticky lg:top-32">
            <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Request a Quote</h3>
                <p className="text-charcoal/60 font-medium text-xs md:text-sm mt-1">Get custom pricing for the {modelName}</p>
            </div>

            <form className="space-y-6">
                <div className="relative">
                    <input type="text" id="quote-name" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Full Name" />
                    <label htmlFor="quote-name" className="absolute left-0 -top-3.5 text-xs font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-xs">Full Name</label>
                </div>
                
                <div className="relative">
                    <input type="tel" id="quote-phone" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Phone Number" />
                    <label htmlFor="quote-phone" className="absolute left-0 -top-3.5 text-xs font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-xs">Phone Number</label>
                </div>

                <div className="relative">
                    <input type="email" id="quote-email" className="peer w-full border-b-2 border-charcoal/20 bg-transparent pt-4 pb-2 text-charcoal focus:outline-none focus:border-brand-red transition-colors placeholder-transparent" placeholder="Email Address" />
                    <label htmlFor="quote-email" className="absolute left-0 -top-3.5 text-xs font-bold text-charcoal/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 hover:cursor-text peer-focus:-top-3.5 peer-focus:text-brand-red peer-focus:text-xs">Email Address</label>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                    <input type="checkbox" id="financing" className="w-4 h-4 md:w-5 md:h-5 accent-brand-red cursor-pointer" />
                    <label htmlFor="financing" className="text-xs md:text-sm font-bold uppercase tracking-wide text-charcoal/70 cursor-pointer">I am interested in financing</label>
                </div>

                <div className="flex items-center gap-3">
                    <input type="checkbox" id="trade" className="w-4 h-4 md:w-5 md:h-5 accent-brand-red cursor-pointer" />
                    <label htmlFor="trade" className="text-xs md:text-sm font-bold uppercase tracking-wide text-charcoal/70 cursor-pointer">I have a trade-in</label>
                </div>

                <button type="button" className="group bg-brand-red text-white px-6 md:px-8 py-4 w-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-all mt-6 md:mt-8">
                    <span>Get Pricing Options</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default QuoteForm;
