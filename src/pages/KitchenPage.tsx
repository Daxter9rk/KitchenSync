import { tickets } from '../shared/demoData';

const columns = [
  { key: 'pending', title: 'Pendiente' },
  { key: 'preparing', title: 'Preparando' },
  { key: 'ready', title: 'Listo' }
] as const;

export function KitchenPage() {
  return <div><div className="tabs"><button className="active">♨ Parrilla</button><button>Sushi</button><button>Barra</button><button>Postres</button></div><div className="kitchen-layout"><section className="kanban">{columns.map(column => <div className={`kanban-column ${column.key}`} key={column.key}><div className="column-head"><h2>{column.title}</h2><span>{tickets.filter(t => t.status === column.key).length}</span></div>{tickets.filter(t => t.status === column.key).map(ticket => <article className="ticket" key={ticket.id}><header><div><h3>Mesa {ticket.table}</h3><small>#{ticket.id}</small></div><div><span className="elapsed">{ticket.elapsed} min</span><span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></div></header><ul>{ticket.items.map(item => <li key={item}>{item}</li>)}</ul>{ticket.note && <p className="note">{ticket.note}</p>}<footer>{ticket.status === 'pending' && <button className="primary">Iniciar</button>}{ticket.status === 'preparing' && <><button>+1 listo</button><button className="success">Completar</button></>}{ticket.status === 'ready' && <button className="success">Entregar</button>}</footer></article>)}</div>)}</section><aside className="panel kitchen-aside"><h2>Carga por estación</h2>{[['Parrilla',76],['Sushi',62],['Barra',48],['Postres',34]].map(([label,value]) => <div className="load" key={label}><div><span>{label}</span><strong>{value}%</strong></div><progress value={value} max="100" /></div>)}<hr/><h2>Alertas</h2><p className="alert">3 tickets con más de 20 min</p><p className="alert muted">Sushi · Stock bajo</p></aside></div></div>;
}
