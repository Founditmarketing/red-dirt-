import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import BrandLogos from '../components/BrandLogos';
import FeaturedMarquee from '../components/FeaturedMarquee';
import TrustMetrics from '../components/TrustMetrics';
import DealershipStory from '../components/DealershipStory';
import InventoryGrid from '../components/InventoryGrid';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>
                    Red Dirt Tractors | TYM, Mahindra, Ferris &amp; Wacker Neuson Dealer in Alexandria, LA
                </title>
                <meta
                    name="description"
                    content="Red Dirt Tractors is Central Louisiana's heavy iron dealership on Hwy 71 South in Alexandria. Authorized for TYM, Mahindra, Ferris, Wacker Neuson, and Yanmar with full parts, service, and financing."
                />
            </Helmet>
            <Hero />
            <BrandLogos />
            <FeaturedMarquee />
            <TrustMetrics />
            <InventoryGrid />
            <DealershipStory />
            <Testimonials />
        </>
    );
};

export default Home;
