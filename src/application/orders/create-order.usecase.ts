// src/application/orders/create-order.usecase.ts
import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/orders/order.entity';
import { OrdersRepository } from '../../infrastructure/orders/orders.repository';
import { EventsService } from '../../application/events/events.service';

export class CreateOrderDto {
  customer: string;
  products: { productId: string; quantity: number }[];
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly eventsService: EventsService,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    // Aquí la lógica de validación y cálculo. Por ejemplo, simular precios:
    const pricing = { 'prod-1': 100, 'prod-2': 200 };
    const order = new Order(
      'order-id-generated', // Este ID podría generarse dinámicamente
      createOrderDto.customer,
      createOrderDto.products,
      0, // Total a calcular
    );
    order.total = order.calculateTotal(pricing);

    // Persistir el pedido
    await this.ordersRepository.save(order);

    // Publicar el evento de orden creada
    await this.eventsService.publishEvent({
      type: 'order_created',
      payload: { orderId: order.id, total: order.total },
    });

    return order;
  }
}
