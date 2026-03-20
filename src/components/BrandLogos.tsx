const BrandLogos = () => {
    // Real brand logos referenced from Wikimedia/public sources
    const brands = [
        { name: "TYM Tractors", url: "/brands/tym.png" },
        { name: "Mahindra", url: "/brands/mahindra.png" },
        { name: "Ferris", url: "/brands/ferris.svg" },
        { name: "Wacker Neuson", url: "/brands/wacker_neuson.png" },
        { name: "Yanmar", url: "/brands/yanmar.png" }
    ];

    // Duplicate the array to create a seamless infinite scrolling loop
    const SCROLLING_BRANDS = [...brands, ...brands, ...brands, ...brands];

    return (
        <section className="bg-white border-b border-charcoal/10 py-16 overflow-hidden relative">
            <div className="w-full">
                <p className="text-center text-sm font-bold text-charcoal/60 uppercase tracking-[0.2em] mb-12">
                    Authorized Dealer & Service Center For
                </p>
                
                {/* Gradient Masks for smooth fade in/out at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Container */}
                <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] items-center">
                    {SCROLLING_BRANDS.map((brand, index) => (
                        <div
                            key={index}
                            className="w-48 md:w-72 mx-8 md:mx-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
                        >
                            <img 
                                src={brand.url} 
                                alt={`${brand.name} Logo`} 
                                className="w-full h-auto max-h-24 md:max-h-32 object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
