import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Shield } from 'lucide-react';
import Gallery from '../components/equipment/Gallery';
import SpecsTable from '../components/equipment/SpecsTable';
import QuoteForm from '../components/equipment/QuoteForm';
import { getTractorById } from '../data/inventory';

// We will fetch the actual data later, mock data for now
const mockEquipmentData = {
    id: "1",
    make: "TYM",
    model: "T25",
    category: "Sub-Compact Tractor",
    price: "Call for Pricing",
    description: "The TYM T25 is engineered for versatility and power in a compact frame. Whether you're maintaining a small acreage, moving materials, or handling precise landscaping tasks, the T25 delivers professional-grade performance. Features a robust Yanmar engine and intuitive controls designed for all skill levels.",
    images: [
        "/tractors/12.jpg",
        "/tractors/11.jpg",
        "/tractors/13.jpg"
    ],
    specs: {
        engineHP: "24.5 HP",
        ptoHP: "18.3 HP",
        weight: "1,610 lbs",
        loaderCapacity: "1,380 lbs (to max height)",
        transmission: "2-Range HST"
    },
    features: [
        "Yanmar 3-Cylinder Diesel Engine",
        "Dual Gear Pump Hydraulic System",
        "Foldable ROPS",
        "Cruise Control Standard",
        "Ergonomic Operator Station"
    ]
};

const EquipmentDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(mockEquipmentData);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            const tractorInfo = getTractorById(id);
            if (tractorInfo) {
                // Merge dynamically loaded core info into the rich UI schema
                setData({
                    ...mockEquipmentData,
                    id: tractorInfo.id.toString(),
                    model: tractorInfo.model,
                    images: [
                        `/tractors/${tractorInfo.id}.jpg`,
                        "/tractors/12.jpg", // Secondary placeholder shots
                        "/tractors/11.jpg"
                    ]
                });
            }
        }
    }, [id]);

    return (
        <div className="pt-20 md:pt-24 min-h-screen bg-off-white pb-16 md:pb-24">
            
            {/* Breadcrumb Navigation */}
            <div className="bg-charcoal px-4 md:px-6 py-4">
                <div className="container mx-auto flex flex-wrap items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-1 md:gap-2 shrink-0">
                        <ArrowLeft size={14} className="md:w-4 md:h-4" /> Back to Inventory
                    </Link>
                    <ChevronRight size={14} className="md:w-4 md:h-4 shrink-0" />
                    <span className="text-white shrink-0">{data.make}</span>
                    <ChevronRight size={14} className="md:w-4 md:h-4 shrink-0" />
                    <span className="text-brand-red shrink-0 truncate">{data.model}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-12">
                
                {/* Header */}
                <div className="mb-8 md:mb-12 border-b-2 border-charcoal/10 pb-6 md:pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                <span className="bg-charcoal text-white px-2 py-1 md:px-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">{data.category}</span>
                                <span className="bg-brand-red text-white px-2 py-1 md:px-3 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Shield size={10} className="md:w-3 md:h-3" /> 6-Year Warranty
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-charcoal leading-none">
                                {data.make} <span className="text-brand-red">{data.model}</span>
                            </h1>
                        </div>
                        <div className="text-left md:text-right mt-2 md:mt-0">
                            <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-charcoal/50 mb-1">Starting At</div>
                            <div className="text-2xl md:text-3xl font-black text-charcoal">{data.price}</div>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    
                    {/* Left Column (Gallery & Details) */}
                    <div className="lg:col-span-2 space-y-12 md:space-y-16">
                        <Gallery images={data.images} />

                        {/* Description & Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-1 md:pl-0">
                            <div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 md:mb-6">Overview</h3>
                                <p className="text-charcoal/70 font-medium leading-relaxed text-sm md:text-base">{data.description}</p>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 md:mb-6">Key Features</h3>
                                <ul className="space-y-3 md:space-y-4">
                                    {data.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 md:gap-4">
                                            <div className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-red"></div>
                                            </div>
                                            <span className="font-bold text-charcoal text-xs md:text-sm leading-tight md:leading-normal pt-0.5">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div>
                            <SpecsTable specs={data.specs} />
                        </div>
                    </div>

                    {/* Right Column (Sticky Quote Form) */}
                    <div className="relative">
                        <QuoteForm modelName={`${data.make} ${data.model}`} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EquipmentDetail;
