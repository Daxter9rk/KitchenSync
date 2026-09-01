import { NavLink, Outlet, useLocation } from 'react-router-dom';

const nav = [
  ['Dashboard', '/dashboard', '▦'],
  ['Mesas', '/mesas', '▤'],
  ['Pedidos', '/pedidos', '▣'],
  ['Cocina', '/cocina', '♨'],
  ['Catálogo', '/catalogo', '◇'],
  ['Reportes', '/reportes', '▥'],
  ['Configuración', '/configuracion', '⚙']
] as const;

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard', '/mesas': 'Mesas', '/pedidos': 'Pedidos',
  '/cocina': 'Cocina', '/catalogo': 'Catálogo', '/reportes': 'Reportes y analíticas',
  '/configuracion': 'Configuración'
};

export function AppShell() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Kitchen<span>Sync</span></div>
        <nav>
          {nav.map(([label, path, icon]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span>{icon}</span>{label}
            </NavLink>
          ))}
        </nav>
        <div className="user-card"><div className="avatar">AM</div><div><strong>Andrea Méndez</strong><small>Administrador DEV</small></div></div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div><h1>{titles[location.pathname] ?? 'KitchenSync'}</h1><p>Laboratorio operativo en entorno DEV</p></div>
          <div className="top-actions"><input aria-label="Buscar" placeholder="Buscar mesa, pedido o producto…" /><span className="env-badge">DEV</span><div className="avatar">AM</div></div>
        </header>
        <section className="page-content"><Outlet /></section>
      </main>
    </div>
  );
}
