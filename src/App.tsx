import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';

import Layout from './Layout';
import Home from './pages/Home';
import ScrollToAnchor from './components/ScrollToAnchor';
import CompareTray from './components/CompareTray';
import { InventoryProvider } from './context/InventoryContext';
import { CompareProvider } from './context/CompareContext';
import { SavedProvider } from './context/SavedContext';

const EquipmentDetail = lazy(() => import('./pages/EquipmentDetail'));
const PartsService = lazy(() => import('./pages/PartsService'));
const Inventory = lazy(() => import('./pages/Inventory'));
const Financing = lazy(() => import('./pages/Financing'));
const Implements = lazy(() => import('./pages/Implements'));
const Trailers = lazy(() => import('./pages/Trailers'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Reviews = lazy(() => import('./pages/Reviews'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const TradeIn = lazy(() => import('./pages/TradeIn'));
const Resources = lazy(() => import('./pages/Resources'));
const ResourceArticle = lazy(() => import('./pages/ResourceArticle'));
const FindMyTractor = lazy(() => import('./pages/FindMyTractor'));
const DealerCity = lazy(() => import('./pages/DealerCity'));
const Compare = lazy(() => import('./pages/Compare'));
const Saved = lazy(() => import('./pages/Saved'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center pt-24">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-xs font-bold text-charcoal/55 uppercase tracking-[0.25em]">
        Loading
      </p>
    </div>
  </div>
);

function App() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Red Dirt Tractors',
    image: 'https://reddirt-tractors.com/og-image.png',
    '@id': 'https://reddirt-tractors.com/',
    url: 'https://reddirt-tractors.com/',
    telephone: '+13184429010',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hwy 71 South',
      addressLocality: 'Alexandria',
      addressRegion: 'LA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.3113,
      longitude: -92.4451,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '15:00',
      },
    ],
    brand: [
      { '@type': 'Brand', name: 'TYM Tractors' },
      { '@type': 'Brand', name: 'Mahindra' },
      { '@type': 'Brand', name: 'Ferris Mowers' },
      { '@type': 'Brand', name: 'Wacker Neuson' },
    ],
  };

  return (
    <MotionConfig reducedMotion="user">
    <InventoryProvider>
      <SavedProvider>
      <CompareProvider>
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
        </Helmet>
        <Router>
          <ScrollToAnchor />
          <Layout>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipment/:id" element={<EquipmentDetail />} />
                <Route path="/parts-service" element={<PartsService />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/financing" element={<Financing />} />
                <Route path="/implements" element={<Implements />} />
                <Route path="/trailers" element={<Trailers />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/trade-in" element={<TradeIn />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:slug" element={<ResourceArticle />} />
                <Route path="/find-my-tractor" element={<FindMyTractor />} />
                <Route path="/dealer/:slug" element={<DealerCity />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
          <CompareTray />
        </Router>
      </CompareProvider>
      </SavedProvider>
    </InventoryProvider>
    </MotionConfig>
  );
}

export default App;
