import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import EquipmentDetail from './pages/EquipmentDetail';
import PartsService from './pages/PartsService';
import Inventory from './pages/Inventory';
import Financing from './pages/Financing';
import Implements from './pages/Implements';
import Trailers from './pages/Trailers';
import ScrollToAnchor from './components/ScrollToAnchor';
import { Helmet } from 'react-helmet-async';
import { InventoryProvider } from './context/InventoryContext';

function App() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Red Dirt Tractors",
    "image": "https://reddirt-tractors.com/about.jpg",
    "@id": "https://reddirt-tractors.com/",
    "url": "https://reddirt-tractors.com/",
    "telephone": "+13184429010",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hwy 71 South",
      "addressLocality": "Alexandria",
      "addressRegion": "LA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.3113,
      "longitude": -92.4451
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "15:00"
    }],
    "brand": [
      { "@type": "Brand", "name": "TYM Tractors" },
      { "@type": "Brand", "name": "Mahindra" },
      { "@type": "Brand", "name": "Ferris Mowers" },
      { "@type": "Brand", "name": "Wacker Neuson" }
    ]
  };

  return (
    <>
      <InventoryProvider>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <Router>
      <ScrollToAnchor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/parts-service" element={<PartsService />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/implements" element={<Implements />} />
          <Route path="/trailers" element={<Trailers />} />
        </Routes>
      </Layout>
    </Router>
      </InventoryProvider>
    </>
  );
}

export default App;
