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
                
                {/* Horizontal scroll on mobile, flex row on desktop */}
                <div className="-mx-4 md:mx-0 px-4 md:px-0">
                    <div className="flex gap-8 md:gap-12 lg:gap-16 items-center justify-start md:justify-between overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 md:pb-0">
                        {brands.map((brand, index) => {
                            const isTYM = brand.name === "TYM Tractors";
                            return (
                                <div
                                    key={index}
                                    className="shrink-0 snap-center w-28 sm:w-36 md:w-48 lg:w-56 xl:w-72 transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md flex justify-center"
                                >
                                    <img 
                                        src={brand.url} 
                                        alt={`${brand.name} Logo`} 
                                        className={`w-full h-auto object-contain ${isTYM ? 'max-h-16 sm:max-h-20 md:max-h-32 lg:max-h-40' : 'max-h-12 sm:max-h-16 md:max-h-28 lg:max-h-36'}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
