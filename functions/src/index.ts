import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

initializeApp();
const db = getFirestore();

function requireRole(auth: { token: Record<string, unknown> } | undefined, roles: string[]) {
  if (!auth) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  const role = String(auth.token.role ?? '');
  if (!roles.includes(role)) throw new HttpsError('permission-denied', 'No tienes permisos para esta operación.');
  return role;
}

export const closeOrder = onCall({ region: 'us-central1' }, async request => {
  requireRole(request.auth, ['admin', 'waiter']);
  const orderId = String(request.data?.orderId ?? '').trim();
  if (!orderId) throw new HttpsError('invalid-argument', 'orderId es obligatorio.');

  const orderRef = db.collection('orders').doc(orderId);
  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(orderRef);
    if (!snapshot.exists) throw new HttpsError('not-found', 'Pedido no encontrado.');
    const order = snapshot.data()!;
    if (order.status === 'closed') return;
    if (order.status !== 'delivered') throw new HttpsError('failed-precondition', 'Sólo se puede cerrar un pedido entregado.');
    transaction.update(orderRef, { status: 'closed', closedAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
    transaction.set(db.collection('auditEvents').doc(), { type: 'order.closed', orderId, actorId: request.auth!.uid, createdAt: FieldValue.serverTimestamp() });
  });
  return { ok: true, orderId };
});

export const health = onCall({ region: 'us-central1' }, async () => ({ ok: true, service: 'kitchensync-functions' }));
