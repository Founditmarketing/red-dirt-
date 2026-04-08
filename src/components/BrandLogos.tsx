const BrandLogos = () => {
    // Real brand logos referenced from Wikimedia/public sources
    const brands = [
        { name: "Mahindra", url: "/brands/mahindralogo.webp" },
        { name: "Ferris", url: "/brands/ferrislogo.webp" },
        { name: "TYM Tractors", url: "/brands/tymlogo.png" },
        { name: "Wacker Neuson", url: "/brands/Wacker_Neuson_Logo.png" },
        { name: "Yanmar", url: "/brands/yanmarlogo.png" }
    ];

    return (
        <section className="bg-white border-b border-charcoal/10 py-6 md:py-8 overflow-hidden relative w-full">
            <div className="w-full px-4 md:px-12 lg:px-24 box-border">
                <p className="text-center text-xs md:text-sm font-bold text-charcoal/60 uppercase tracking-[0.2em] mb-6">
                    Authorized Dealer & Service Center For
                </p>
                
                {/* Full-width Banner Logo Row */}
                <div className="flex justify-center xl:justify-between items-center gap-8 md:gap-12 lg:gap-16 flex-wrap md:flex-nowrap">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="w-32 md:w-48 lg:w-56 xl:w-72 shrink transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md"
                        >
                            <img 
                                src={brand.url} 
                                alt={`${brand.name} Logo`} 
                                className="w-full h-auto max-h-20 md:max-h-28 lg:max-h-36 object-contain mx-auto"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
