import { Order, OrderStatus } from './order.entity';

describe('Order Entity', () => {
  it('should calculate total correctly', () => {
    const order = new Order('id1', 'Luis', [
      { productId: 'prod-1', quantity: 2, price: 100 },
      { productId: 'prod-2', quantity: 1, price: 200 },
    ]);
    expect(order.total).toEqual(400);
  });

  it('should apply discount correctly', () => {
    const order = new Order('id1', 'Luis', [
      { productId: 'prod-1', quantity: 2, price: 100 },
      { productId: 'prod-2', quantity: 1, price: 200 },
    ]);
    order.applyDiscount(10);
    expect(order.total).toEqual(400 * 0.9);
  });

  it('should not allow invalid status transitions', () => {
    const order = new Order('id1', 'Luis', [
      { productId: 'prod-1', quantity: 2, price: 100 },
    ]);
    order.changeStatus(OrderStatus.CANCELLED);
    expect(() => order.changeStatus(OrderStatus.CONFIRMED)).toThrow();
  });
});
