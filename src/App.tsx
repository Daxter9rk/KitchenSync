import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { CatalogPage } from './pages/CatalogPage';
import { DashboardPage } from './pages/DashboardPage';
import { KitchenPage } from './pages/KitchenPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { ReportsPage } from './pages/ReportsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="mesas" element={<PlaceholderPage title="Mesas" description="Mapa operativo del salón y disponibilidad en tiempo real." />} />
        <Route path="pedidos" element={<PlaceholderPage title="Pedidos" description="Creación, seguimiento y entrega de comandas." />} />
        <Route path="cocina" element={<KitchenPage />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="reportes" element={<ReportsPage />} />
        <Route path="configuracion" element={<PlaceholderPage title="Configuración" description="Parámetros del restaurante, estaciones y permisos." />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
