import { Routes, Route } from 'react-router-dom';
import Home from './pages/site/Home';
import Shows from './pages/site/Shows';
import Musicas from './pages/site/Musicas';
import Galeria from './pages/site/Galeria';
import Biografia from './pages/site/Biografia';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminShows from './pages/admin/Shows';
import AdminMusicas from './pages/admin/Musicas';
import AdminFotos from './pages/admin/Fotos';
import AdminIntegrantes from './pages/admin/Integrantes';
import AdminPatrocinadores from './pages/admin/Patrocinadores';
import AdminRecados from './pages/admin/Recados';
import AdminContato from './pages/admin/Contato';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppFab from './components/site/WhatsAppFab';
import Analytics from './components/site/Analytics';
import NotFound from './pages/site/NotFound';
import PoliticaPrivacidade from './pages/site/PoliticaPrivacidade';

export default function App() {
  return (
    <>
    <Routes>
      {/* ===== Site público ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/musicas" element={<Musicas />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/biografia" element={<Biografia />} />
      <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />

      {/* ===== Painel administrativo ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="shows" element={<AdminShows />} />
        <Route path="fotos" element={<AdminFotos />} />
        <Route path="musicas" element={<AdminMusicas />} />
        <Route path="integrantes" element={<AdminIntegrantes />} />
        <Route path="patrocinadores" element={<AdminPatrocinadores />} />
        <Route path="recados" element={<AdminRecados />} />
        <Route path="contato" element={<AdminContato />} />
      </Route>

      {/* 404 — qualquer rota não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <WhatsAppFab />
    <Analytics />
    </>
  );
}
