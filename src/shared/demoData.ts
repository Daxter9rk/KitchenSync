export type TableStatus = 'free' | 'ordered' | 'preparing';
export interface DiningTable { id: number; seats: number; status: TableStatus; total?: number; time?: string; }
export interface Product { id: string; name: string; category: string; price: number; station: string; available: boolean; }
export interface KitchenTicket { id: string; table: number; status: 'pending' | 'preparing' | 'ready'; elapsed: number; priority: 'Alta' | 'Media'; items: string[]; note?: string; }

export const tables: DiningTable[] = [
  { id: 1, seats: 4, status: 'ordered', total: 1250, time: '18:47' },
  { id: 2, seats: 2, status: 'preparing', total: 890, time: '18:35' },
  { id: 3, seats: 4, status: 'free' },
  { id: 4, seats: 6, status: 'ordered', total: 2150, time: '18:50' },
  { id: 5, seats: 2, status: 'preparing', total: 650, time: '18:40' },
  { id: 6, seats: 4, status: 'free' },
  { id: 7, seats: 3, status: 'ordered', total: 1050, time: '18:55' },
  { id: 8, seats: 2, status: 'free' }
];

export const products: Product[] = [
  { id: 'TAP-001', name: 'Tacos al Pastor', category: 'Platos fuertes', price: 185, station: 'Parrilla', available: true },
  { id: 'PAF-002', name: 'Pasta Alfredo', category: 'Platos fuertes', price: 220, station: 'Cocina', available: true },
  { id: 'RIB-300', name: 'Ribeye 300 g', category: 'Platos fuertes', price: 450, station: 'Parrilla', available: true },
  { id: 'CEV-003', name: 'Ceviche Mixto', category: 'Entradas', price: 210, station: 'Fría', available: true },
  { id: 'MOJ-001', name: 'Mojito Clásico', category: 'Bebidas', price: 120, station: 'Barra', available: true },
  { id: 'CHE-005', name: 'Cheesecake de Maracuyá', category: 'Postres', price: 150, station: 'Postres', available: false }
];

export const tickets: KitchenTicket[] = [
  { id: '1024', table: 1, status: 'pending', elapsed: 12, priority: 'Alta', items: ['2 Tacos al Pastor', '1 Guacamole', '1 Agua de Jamaica'], note: 'Sin cebolla en los tacos.' },
  { id: '1027', table: 5, status: 'pending', elapsed: 9, priority: 'Alta', items: ['1 Ribeye 300 g', '1 Papas a la francesa'], note: 'Carne término medio.' },
  { id: '1025', table: 2, status: 'preparing', elapsed: 19, priority: 'Alta', items: ['2 Sushi variado', '1 Edamames', '1 Té verde'] },
  { id: '1026', table: 3, status: 'preparing', elapsed: 14, priority: 'Media', items: ['1 Salmón a la parrilla', '1 Puré de papa'] },
  { id: '1023', table: 4, status: 'ready', elapsed: 8, priority: 'Media', items: ['1 Ceviche mixto', '1 Tostadas de atún'] },
  { id: '1028', table: 7, status: 'ready', elapsed: 2, priority: 'Media', items: ['2 Postres de chocolate', '2 Café americano'] }
];
