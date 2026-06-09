interface SpecsTableProps {
    specs: Record<string, string | number | null | undefined>;
}

const SpecsTable = ({ specs }: SpecsTableProps) => {
    // Convert object to array, and filter out any empty values
    const validSpecs = Object.entries(specs || {}).filter(([_, value]) => 
        value !== null && value !== undefined && value !== ''
    );

    if (validSpecs.length === 0) {
         return null; // Don't render the table if there are no extra specs
    }

    return (
        <div className="bg-white border border-charcoal/10 text-charcoal shadow-sm">
            <div className="bg-charcoal text-white px-4 md:px-6 py-3 md:py-4">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-widest">Key Specifications</h3>
            </div>
            
            <div className="divide-y divide-charcoal/10">
                {validSpecs.map(([key, value]) => {
                     // Format the key for display (e.g., "ptoHP" -> "Pto Hp", "engine_size" -> "Engine Size")
                     const displayKey = key
                         .replace(/([A-Z])/g, ' $1') // insert a space before all caps
                         .replace(/_/g, ' ') // replace underscores with spaces
                         .replace(/^./, str => str.toUpperCase()); // uppercase the first character

                     return (
                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between px-4 md:px-6 py-3 md:py-4 hover:bg-off-white transition-colors gap-1 sm:gap-4">
                            <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-charcoal/60">{displayKey}</span>
                            <span className="font-black sm:font-medium text-sm md:text-base sm:text-right">{value}</span>
                        </div>
                     );
                })}
            </div>
        </div>
    );
};

export default SpecsTable;
