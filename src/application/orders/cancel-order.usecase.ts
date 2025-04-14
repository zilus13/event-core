// src/application/orders/cancel-order.usecase.ts
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../../infrastructure/orders/orders.repository';
import { Order, OrderStatus } from '../../domain/orders/order.entity';
import { EventsService } from '../../application/events/events.service';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly eventsService: EventsService,
  ) {}

  async execute(orderId: string): Promise<Order> {
    // Buscar la orden
    const order = await this.ordersRepository.findById(orderId);
    if (!order) {
      throw new Error('Orden no encontrada');
    }
    // Validar que la orden no esté ya cancelada
    if (order.status === OrderStatus.CANCELLED) {
      throw new Error('La orden ya está cancelada');
    }
    // Cambiar el estado de la orden
    order.changeStatus(OrderStatus.CANCELLED);
    // Actualizar la orden en el repositorio
    await this.ordersRepository.update(order);
    // Emitir evento de cancelación
    await this.eventsService.publishEvent({
      type: 'order_cancelled',
      payload: { orderId: order.id },
    });
    return order;
  }
}
