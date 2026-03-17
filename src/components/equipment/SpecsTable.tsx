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
        <div className="bg-white border text-charcoal shadow-sm">
            <div className="bg-charcoal text-white px-6 py-4">
                <h3 className="text-xl font-black uppercase tracking-widest">Key Specifications</h3>
            </div>
            
            <div className="divide-y divide-charcoal/10">
                <div className="flex justify-between px-6 py-4 hover:bg-off-white transition-colors">
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal/60">Engine HP</span>
                    <span className="font-medium text-right">{specs.engineHP}</span>
                </div>
                <div className="flex justify-between px-6 py-4 hover:bg-off-white transition-colors">
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal/60">PTO HP</span>
                    <span className="font-medium text-right">{specs.ptoHP}</span>
                </div>
                <div className="flex justify-between px-6 py-4 hover:bg-off-white transition-colors">
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal/60">Operating Weight</span>
                    <span className="font-medium text-right">{specs.weight}</span>
                </div>
                <div className="flex justify-between px-6 py-4 hover:bg-off-white transition-colors">
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal/60">Loader Capacity (Max Height)</span>
                    <span className="font-medium text-right">{specs.loaderCapacity}</span>
                </div>
                <div className="flex justify-between px-6 py-4 hover:bg-off-white transition-colors">
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal/60">Transmission</span>
                    <span className="font-medium text-right">{specs.transmission}</span>
                </div>
            </div>
        </div>
    );
};

export default SpecsTable;
