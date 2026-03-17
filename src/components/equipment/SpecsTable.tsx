interface SpecsTableProps {
    specs: {
        engineHP: string;
        ptoHP: string;
        weight: string;
        loaderCapacity: string;
        transmission: string;
    };
}

const SpecsTable = ({ specs }: SpecsTableProps) => {
    return (
        <div className="bg-white border border-charcoal/10 text-charcoal shadow-sm">
            <div className="bg-charcoal text-white px-4 md:px-6 py-3 md:py-4">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-widest">Key Specifications</h3>
            </div>
            
            <div className="divide-y divide-charcoal/10">
                <div className="flex flex-col sm:flex-row sm:justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-off-white transition-colors gap-1 sm:gap-4">
                    <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-charcoal/60">Engine HP</span>
                    <span className="font-black sm:font-medium text-sm md:text-base sm:text-right">{specs.engineHP}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-off-white transition-colors gap-1 sm:gap-4">
                    <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-charcoal/60">PTO HP</span>
                    <span className="font-black sm:font-medium text-sm md:text-base sm:text-right">{specs.ptoHP}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-off-white transition-colors gap-1 sm:gap-4">
                    <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-charcoal/60">Operating Weight</span>
                    <span className="font-black sm:font-medium text-sm md:text-base sm:text-right">{specs.weight}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-off-white transition-colors gap-1 sm:gap-4">
                    <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-charcoal/60">Loader Capacity</span>
                    <span className="font-black sm:font-medium text-sm md:text-base sm:text-right">{specs.loaderCapacity}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-off-white transition-colors gap-1 sm:gap-4">
                    <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-charcoal/60">Transmission</span>
                    <span className="font-black sm:font-medium text-sm md:text-base sm:text-right">{specs.transmission}</span>
                </div>
            </div>
        </div>
    );
};

export default SpecsTable;
