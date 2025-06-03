// src/infrastructure/orders/orders.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../domain/orders/orders.entity';
import { Order } from '../../domain/orders/order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepo: Repository<OrderEntity>,
  ) {}

  async save(order: Order): Promise<Order> {
    // Convertir la entidad de dominio a entidad de persistencia.
    const orderEntity = this.ordersRepo.create({
      id: order.id,
      customer: order.customer,
      products: order.products,
      total: order.total,
      status: order.status,
    });
    await this.ordersRepo.save(orderEntity);
    return order; // Retorna la entidad de dominio sin cambios.
  }

  async findById(id: string): Promise<Order | null> {
    const orderEntity = await this.ordersRepo.findOneBy({ id });
    if (!orderEntity) return null;
    // Mapear la entidad persistida a una instancia del dominio.
    const order = new Order(
      orderEntity.id,
      orderEntity.customer,
      orderEntity.products,
      orderEntity.status as any,
    );
    order.total = Number(orderEntity.total);
    order.createdAt = orderEntity.createdAt;
    order.updatedAt = orderEntity.updatedAt;
    return order;
  }

  async update(order: Order): Promise<Order> {
    await this.ordersRepo.update(
      { id: order.id },
      {
        customer: order.customer,
        products: order.products,
        total: order.total,
        status: order.status,
      },
    );
    return order;
  }

  // Opcional: agregar un método findAll o eliminar según tus necesidades.
}
