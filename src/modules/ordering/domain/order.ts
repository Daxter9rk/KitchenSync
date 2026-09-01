export type OrderStatus = 'draft' | 'sent' | 'preparing' | 'partially_ready' | 'ready' | 'partially_delivered' | 'delivered' | 'closed' | 'cancelled';
export interface OrderItem { id: string; productId: string; name: string; unitPrice: number; quantity: number; cancelled: number; returned: number; }
export interface Order { id: string; tableId: string; status: OrderStatus; items: OrderItem[]; }

const transitions: Record<OrderStatus, OrderStatus[]> = {
  draft: ['sent', 'cancelled'], sent: ['preparing', 'cancelled'],
  preparing: ['partially_ready', 'ready'], partially_ready: ['ready', 'preparing'],
  ready: ['partially_delivered', 'delivered'], partially_delivered: ['delivered', 'ready'],
  delivered: ['closed'], closed: [], cancelled: []
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean { return transitions[from].includes(to); }
export function transitionOrder(order: Order, to: OrderStatus): Order {
  if (!canTransition(order.status, to)) throw new Error(`Transición inválida: ${order.status} → ${to}`);
  return { ...order, status: to };
}
export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => {
    const billable = Math.max(0, item.quantity - item.cancelled - item.returned);
    return total + billable * item.unitPrice;
  }, 0);
}
