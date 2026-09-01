import { products, tables } from '../shared/demoData';

const statusLabel = { free: 'Libre', ordered: 'Con pedido', preparing: 'En preparación' } as const;

export function DashboardPage() {
  return (
    <div className="dashboard-grid">
      <section className="panel span-2">
        <div className="section-head"><div><h2>Mapa de mesas</h2><p>Operación actual del salón principal</p></div><button className="ghost">Salón principal⌄</button></div>
        <div className="table-grid">{tables.map(table => <article key={table.id} className={`table-card ${table.status}`}><div className="table-icon">●</div><div><h3>Mesa {table.id}</h3><p>{table.seats} personas</p></div><span className="status-chip">{statusLabel[table.status]}</span><footer><small>{table.time ?? '—'}</small><strong>{table.total ? `$${table.total.toLocaleString('es-MX')}` : '—'}</strong></footer></article>)}</div>
      </section>
      <section className="panel order-panel">
        <div className="section-head"><div><h2>Mesa 1</h2><p>4 personas · Mesera: Andrea M.</p></div><span className="status-chip orange">Con pedido</span></div>
        <label>Notas del pedido<input value="Sin cebolla en los tacos." readOnly /></label>
        <div className="order-list"><div><span>Tacos al Pastor<small>Sin cebolla</small></span><strong>2 × $185</strong></div><div><span>Queso fundido<small>Con chorizo</small></span><strong>1 × $180</strong></div><div><span>Ribeye 300 g<small>Término medio</small></span><strong>1 × $450</strong></div></div>
        <div className="order-total"><span>Total del pedido</span><strong>$1,000</strong></div><div className="button-stack"><button>Agregar producto</button><button className="primary">Enviar a cocina</button><button className="success">Cerrar pedido</button></div>
      </section>
      <section className="panel span-2"><div className="section-head"><div><h2>Catálogo rápido</h2><p>Productos disponibles para la comanda</p></div><button className="ghost">Ver catálogo</button></div><div className="product-strip">{products.slice(0,5).map(product => <article key={product.id}><div className="food-thumb">{product.name.slice(0,1)}</div><h3>{product.name}</h3><p>{product.category}</p><strong>${product.price}</strong></article>)}</div></section>
      <section className="panel metrics"><h2>Métricas del día</h2><div><span>Mesas activas</span><strong>12 / 20</strong></div><div><span>Pedidos pendientes</span><strong>18</strong></div><div><span>Ventas del día</span><strong>$18,750</strong></div><div><span>Ticket promedio</span><strong>$1,563</strong></div></section>
    </div>
  );
}
