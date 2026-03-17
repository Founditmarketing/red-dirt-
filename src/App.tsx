import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import EquipmentDetail from './pages/EquipmentDetail';
import PartsService from './pages/PartsService';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/parts-service" element={<PartsService />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
