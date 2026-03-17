import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Shield } from 'lucide-react';
import Gallery from '../components/equipment/Gallery';
import SpecsTable from '../components/equipment/SpecsTable';
import QuoteForm from '../components/equipment/QuoteForm';

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
    const [data] = useState(mockEquipmentData);

    useEffect(() => {
        // In a real app, we would fetch data based on the ID here
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="pt-24 min-h-screen bg-off-white pb-24">
            
            {/* Breadcrumb Navigation */}
            <div className="bg-charcoal px-6 py-4">
                <div className="container mx-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to Inventory
                    </Link>
                    <ChevronRight size={16} />
                    <span className="text-white">{data.make}</span>
                    <ChevronRight size={16} />
                    <span className="text-brand-red">{data.model}</span>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12">
                
                {/* Header */}
                <div className="mb-12 border-b-2 border-charcoal/10 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-charcoal text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">{data.category}</span>
                                <span className="bg-brand-red text-white px-3 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Shield size={12} /> 6-Year Warranty
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-charcoal">
                                {data.make} <span className="text-brand-red">{data.model}</span>
                            </h1>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="text-sm font-bold uppercase tracking-widest text-charcoal/50 mb-1">Starting At</div>
                            <div className="text-3xl font-black text-charcoal">{data.price}</div>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    
                    {/* Left Column (Gallery & Details) */}
                    <div className="lg:col-span-2 space-y-16">
                        <Gallery images={data.images} />

                        {/* Description & Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Overview</h3>
                                <p className="text-charcoal/70 font-medium leading-relaxed">{data.description}</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Key Features</h3>
                                <ul className="space-y-4">
                                    {data.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                                            </div>
                                            <span className="font-bold text-charcoal text-sm">{feature}</span>
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
