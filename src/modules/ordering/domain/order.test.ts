import { describe, expect, it } from 'vitest';
import { calculateOrderTotal, canTransition } from './order';

describe('order domain', () => {
  it('permite avanzar de borrador a enviado', () => expect(canTransition('draft', 'sent')).toBe(true));
  it('impide reabrir un pedido cerrado', () => expect(canTransition('closed', 'draft')).toBe(false));
  it('descuenta cancelaciones y devoluciones del total', () => {
    expect(calculateOrderTotal([{ id: '1', productId: 'p1', name: 'Producto', unitPrice: 100, quantity: 4, cancelled: 1, returned: 1 }])).toBe(200);
  });
});
