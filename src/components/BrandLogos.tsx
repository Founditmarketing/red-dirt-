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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between items-center gap-8 md:gap-12 lg:gap-16 place-items-center">
                    {brands.map((brand, index) => {
                        const isTYM = brand.name === "TYM Tractors";
                        
                        let mobileClasses = 'md:order-none';
                        if (brand.name === "Mahindra") mobileClasses = 'order-1 ' + mobileClasses;
                        if (brand.name === "Yanmar") mobileClasses = 'order-2 ' + mobileClasses;
                        if (brand.name === "Wacker Neuson") mobileClasses = 'order-3 ' + mobileClasses;
                        if (brand.name === "Ferris") mobileClasses = 'order-4 ' + mobileClasses;
                        if (isTYM) mobileClasses = 'order-5 col-span-2 md:col-span-1 ' + mobileClasses;

                        return (
                            <div
                                key={index}
                                className={`w-36 sm:w-40 md:w-48 lg:w-56 xl:w-72 shrink transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md flex justify-center ${mobileClasses}`}
                            >
                                <img 
                                    src={brand.url} 
                                    alt={`${brand.name} Logo`} 
                                    className={`w-full h-auto object-contain ${isTYM ? 'max-h-20 sm:max-h-24 md:max-h-32 lg:max-h-40' : 'max-h-16 sm:max-h-20 md:max-h-28 lg:max-h-36'}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
