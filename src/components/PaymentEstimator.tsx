import { useMemo, useState } from 'react';
import { Calculator, Phone } from 'lucide-react';

import { estimateMonthlyPayment, formatMoney, parsePriceNumber } from '../utils/inventoryDerive';

type PaymentEstimatorProps = {
    price: string | number | null | undefined;
    modelLabel?: string;
};

const TERM_OPTIONS = [
    { months: 36, label: '36 mo' },
    { months: 60, label: '60 mo' },
    { months: 84, label: '84 mo' },
    { months: 120, label: '120 mo' },
];

const PaymentEstimator = ({ price, modelLabel }: PaymentEstimatorProps) => {
    const numericPrice = parsePriceNumber(price);
    const [term, setTerm] = useState(84);
    const [downPercent, setDownPercent] = useState(10);
    const [apr, setApr] = useState(7.99);

    const result = useMemo(() => {
        if (!numericPrice) return null;
        const downPayment = Math.round((numericPrice * downPercent) / 100);
        return estimateMonthlyPayment(numericPrice, { apr, termMonths: term, downPayment });
    }, [numericPrice, term, downPercent, apr]);

    if (!numericPrice) {
        return (
            <div className="bg-white border border-charcoal/10 p-6 md:p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand-red/10 flex items-center justify-center rounded-sm">
                        <Calculator className="text-brand-red" size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45">
                            Payment estimator
                        </p>
                        <h3 className="font-heading font-black uppercase tracking-tight text-lg text-charcoal">
                            Call for pricing
                        </h3>
                    </div>
                </div>
                <p className="text-charcoal/65 font-medium text-sm leading-relaxed mb-5">
                    {modelLabel
                        ? `We will price the ${modelLabel} once we hear about your acreage and configuration.`
                        : 'Pricing is set when we know your configuration.'}
                </p>
                <a
                    href="tel:3184429010"
                    className="inline-flex items-center gap-2 bg-charcoal text-white hover:bg-brand-red px-5 py-3 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                >
                    <Phone size={14} />
                    Call 318-442-9010
                </a>
            </div>
        );
    }

    return (
        <div className="bg-white border border-charcoal/10 p-6 md:p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-brand-red/10 flex items-center justify-center rounded-sm">
                    <Calculator className="text-brand-red" size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45">
                        Payment estimator
                    </p>
                    <h3 className="font-heading font-black uppercase tracking-tight text-lg text-charcoal">
                        Estimate your monthly
                    </h3>
                </div>
            </div>

            <div className="bg-off-white border border-charcoal/10 p-5 mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-1">
                    Estimated monthly
                </p>
                <p className="font-heading font-black tracking-tight text-charcoal text-4xl md:text-5xl">
                    {result ? formatMoney(result.monthly) : '--'}
                    <span className="text-base text-charcoal/55 font-medium ml-1">/mo</span>
                </p>
                {result ? (
                    <p className="text-xs text-charcoal/55 font-medium mt-2">
                        {term} months at {apr}% APR with{' '}
                        {formatMoney(result.downPayment)} down on {formatMoney(numericPrice)} list.
                    </p>
                ) : null}
            </div>

            <fieldset className="mb-4">
                <legend className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-2">
                    Term
                </legend>
                <div className="grid grid-cols-4 gap-2">
                    {TERM_OPTIONS.map((opt) => {
                        const active = opt.months === term;
                        return (
                            <button
                                key={opt.months}
                                type="button"
                                onClick={() => setTerm(opt.months)}
                                className={`py-2.5 text-xs font-bold uppercase tracking-[0.18em] border transition-colors ${
                                    active
                                        ? 'bg-charcoal text-white border-charcoal'
                                        : 'bg-white text-charcoal/65 border-charcoal/15 hover:border-charcoal/40 hover:text-charcoal'
                                }`}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            <label className="block mb-4">
                <span className="flex justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-2">
                    Down payment
                    <span className="text-charcoal">{downPercent}%</span>
                </span>
                <input
                    type="range"
                    min={0}
                    max={50}
                    step={5}
                    value={downPercent}
                    onChange={(e) => setDownPercent(parseInt(e.target.value, 10))}
                    className="w-full accent-brand-red"
                />
            </label>

            <label className="block mb-5">
                <span className="flex justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/45 mb-2">
                    APR
                    <span className="text-charcoal">{apr.toFixed(2)}%</span>
                </span>
                <input
                    type="range"
                    min={4}
                    max={15}
                    step={0.25}
                    value={apr}
                    onChange={(e) => setApr(parseFloat(e.target.value))}
                    className="w-full accent-brand-red"
                />
            </label>

            <p className="text-[11px] text-charcoal/45 font-medium leading-relaxed">
                Estimate only. Real rate, term, and down depend on your credit and the lender. Final
                terms come from Mahindra Finance, DLL, Sheffield, Synchrony, or Vibrant.
            </p>
        </div>
    );
};

export default PaymentEstimator;
