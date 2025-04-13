// src/infrastructure/orders/orders.repository.ts
import { Order } from '../../domain/orders/order.entity';

export class OrdersRepository {
  private orders: Order[] = [];

  save(order: Order): Promise<void> {
    // Simulación de persistencia, en la realidad usarías una DB
    this.orders.push(order);
    return Promise.resolve();
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }
}
