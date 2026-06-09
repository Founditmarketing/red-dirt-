import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ArrowLeft, Shield } from 'lucide-react';
import Gallery from '../components/equipment/Gallery';
import SpecsTable from '../components/equipment/SpecsTable';
import QuoteForm from '../components/equipment/QuoteForm';
import PaymentEstimator from '../components/PaymentEstimator';
import StickyMobileBuyBar from '../components/equipment/StickyMobileBuyBar';
import AlsoViewed from '../components/equipment/AlsoViewed';
import SaveButton from '../components/SaveButton';


import { useInventory } from '../context/InventoryContext';
import { processGoogleDriveUrl } from '../utils/imageFormat';

const getFinanceLinks = (make: string) => {
    const makeLower = make?.toLowerCase() || '';
    if (makeLower.includes('mahindra')) {
        return [{ name: "Apply with Mahindra Finance", url: "https://applynow-cica-prd.mahindrafinanceusa.com/?entityId=3&dealerCode=13276" }];
    }
    if (makeLower.includes('tym')) {
        return [{ name: "Apply with DLL Finance", url: "https://applynow-cica-prd.dllgroup.com/?entityid=2&dealerCode=013276" }];
    }
    if (makeLower.includes('ferris')) {
        return [
            { name: "Apply with Sheffield", url: "https://prequalify.sheffieldfinancial.com/Apply/Dealer/48349?source=web" },
            { name: "Apply with Synchrony", url: "https://www.mysynchrony.com/mmc/PC239787290" }
        ];
    }
    if (makeLower.includes('wacker')) {
        return [{ name: "Apply with Vibrant", url: "https://preapproval-wackerneuson.vibrantequipmentlending.com//main#/entity/FTOS_BNKAP_RetailApplicantData/insert/form/VIB_B2C_CustomerDataCollect/buid=63c77439-6c38-49fe-aa27-6610fe47b50a" }];
    }
    return [{ name: "Text for Finance Options", url: "sms:3184429010" }];
};

const EquipmentDetail = () => {
    const { id } = useParams();
    const { inventory, loading } = useInventory();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id && inventory.length > 0) {
            const tractorInfo = inventory.find((t) => t.id.toString() === id);
            if (tractorInfo) {
                // Parse out images if they exist, otherwise empty
                let images: string[] = [];
                const imgStr = tractorInfo['Image URL'] || tractorInfo.image_url || tractorInfo.images || tractorInfo.image || tractorInfo.photos || tractorInfo['image url'];
                if (imgStr && typeof imgStr === 'string' && imgStr.trim() !== '') {
                    images = imgStr.split(/[\s,]+/).filter(Boolean).map((imgUrl: string) => {
                        return processGoogleDriveUrl(imgUrl);
                    });
                }
                
                // Parse features if they sent standard comma separated string, else empty
                const featuresStr = tractorInfo.features || '';
                const featuresList = typeof featuresStr === 'string' && featuresStr.trim() !== '' 
                    ? featuresStr.split(',').map(s => s.trim()) 
                    : [];

                // Filter out standard keys so we can dump the rest into the dynamic SpecsTable
                const standardKeys = ['id', 'make', 'model', 'category', 'price', 'description', 'features'];
                const dynamicSpecs: any = {};
                
                Object.keys(tractorInfo).forEach(key => {
                     const lowerKey = key.toLowerCase();
                     const isImageColumn = lowerKey.includes('image') || lowerKey.includes('url');
                     
                     if (!standardKeys.includes(key) && !isImageColumn) {
                          dynamicSpecs[key] = tractorInfo[key];
                     }
                });

                setData({
                    ...tractorInfo,
                    model: tractorInfo.model || 'Unknown Model',
                    make: tractorInfo.make || 'Equipment',
                    price: tractorInfo.price || 'Call for Pricing',
                    category: tractorInfo.category || 'Tractor',
                    description: tractorInfo.description || 'Contact us for more details about this equipment.',
                    images,
                    features: featuresList,
                    specs: dynamicSpecs
                });
            }
        }
    }, [id, inventory]);

    if (loading || !data) {
        return (
            <div className="pt-20 md:pt-24 min-h-screen bg-off-white pb-16 md:pb-24 flex items-center justify-center">
                 <div className="text-center">
                      <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-sm font-bold text-charcoal/50 uppercase tracking-widest">Loading Equipment Data...</p>
                 </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-off-white pb-16 md:pb-24">
            <Helmet>
                <title>{`${data.make} ${data.model} Tractor | Red Dirt Tractors in Alexandria, LA`}</title>
                <meta name="description" content={`Explore the ${data.make} ${data.model}. ${data.description.substring(0, 150)}...`} />
                <meta property="og:title" content={`${data.make} ${data.model} Tractor | Red Dirt Tractors`} />
                <meta property="og:description" content={`Explore the ${data.make} ${data.model}. ${data.description.substring(0, 150)}...`} />
            </Helmet>
            
            {/* Header Gap Filler & Breadcrumbs */}
            <div className="bg-charcoal pt-20 md:pt-24 w-full">
                <div className="px-4 md:px-6 py-4">
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
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-8 md:mt-12">
                
                {/* Header */}
                <div className="mb-8 md:mb-12 border-b-2 border-charcoal/10 pb-6 md:pb-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                <span className="bg-charcoal text-white px-2 py-1 md:px-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">{data.category}</span>
                                <span className="bg-brand-red text-white px-2 py-1 md:px-3 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Shield size={10} className="md:w-3 md:h-3" /> 6-Year Warranty
                                </span>
                                <span className="bg-white border border-charcoal/15 text-charcoal/65 px-2 py-1 md:px-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                    Stock #{String(data.id).slice(-5).padStart(5, '0')}
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-charcoal leading-none">
                                {data.make} <span className="text-brand-red">{data.model}</span>
                            </h1>
                        </div>
                        <div className="flex items-end gap-3 mt-2 md:mt-0">
                            <div className="text-left md:text-right">
                                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-charcoal/50 mb-1">Starting At</div>
                                <div className="text-2xl md:text-3xl font-black text-charcoal">{data.price}</div>
                            </div>
                            <SaveButton item={data} variant="inline" />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-charcoal/55 font-medium">
                        Choose from what's on the lot or order to your exact specs — we'll configure it, finance it, and get it ready.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    
                    {/* Left Column (Gallery & Details) */}
                    <div className="lg:col-span-2 space-y-12 md:space-y-16">
                        <Gallery images={data.images} />

                        {/* Description & Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pl-1 md:pl-0">
                            <div>
                                <p className="text-charcoal/70 font-medium leading-relaxed text-sm md:text-base">{data.description}</p>
                            </div>
                            {data.features && data.features.length > 0 && (
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 md:mb-6">Key Features</h3>
                                    <ul className="space-y-3 md:space-y-4">
                                        {data.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 md:gap-4">
                                                <div className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-red"></div>
                                                </div>
                                                <span className="font-bold text-charcoal text-xs md:text-sm leading-tight md:leading-normal pt-0.5">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Technical Specifications */}
                        <div>
                            <SpecsTable specs={data.specs} />
                        </div>
                    </div>

                    {/* Right Column (Sticky Section) */}
                    <div id="quote-form" className="relative scroll-mt-32">
                        <div className="lg:sticky lg:top-32 space-y-8">
                            <QuoteForm modelName={`${data.make} ${data.model}`} />

                            <PaymentEstimator
                                price={data.price}
                                modelLabel={`${data.make} ${data.model}`}
                            />

                            {/* Brand Specific Finance Links */}
                            <div className="bg-white p-6 md:p-8 border-t-4 border-brand-red/50 shadow-2xl">
                                <div className="mb-6">
                                    <h3 className="text-xl font-black uppercase tracking-tight">Finance This {data.make}</h3>
                                    <p className="text-charcoal/60 font-medium text-xs md:text-sm mt-1">Get approved quickly through our partners</p>
                                </div>
                                <div className="space-y-3">
                                    {getFinanceLinks(data.make).map((link, idx) => (
                                        <a 
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-charcoal text-white px-4 py-3 w-full font-bold uppercase tracking-widest text-xs flex items-center justify-between hover:bg-brand-red transition-colors group rounded-sm"
                                        >
                                            <span>{link.name}</span>
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <AlsoViewed
                    currentId={data.id}
                    currentMake={data.make}
                    currentCategory={data.category}
                    inventory={inventory}
                />
            </div>

            <StickyMobileBuyBar
                modelLabel={`${data.make} ${data.model}`}
                price={data.price}
            />
        </div>
    );
};

export default EquipmentDetail;
