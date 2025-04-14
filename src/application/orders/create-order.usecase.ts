// src/application/orders/create-order.usecase.ts
import { Injectable } from '@nestjs/common';
import { Order, OrderProduct } from '../../domain/orders/order.entity';
import { OrdersRepository } from '../../infrastructure/orders/orders.repository';
import { EventsService } from '../../application/events/events.service';

export class CreateOrderDto {
  customer: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  discountPercentage?: number;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly eventsService: EventsService,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    // Aquí podrías generar un ID único para la orden, usando por ejemplo UUID.
    const orderId = 'order-' + Date.now();

    const products: OrderProduct[] = createOrderDto.products.map((prod) => ({
      productId: prod.productId,
      quantity: prod.quantity,
      price: prod.price,
    }));

    // Crea la entidad Order
    const order = new Order(orderId, createOrderDto.customer, products);

    // Si se especifica un descuento, se aplica
    if (createOrderDto.discountPercentage) {
      order.applyDiscount(createOrderDto.discountPercentage);
    }

    // Aquí podrías validar el stock usando una función de dominio o DomainService
    // if (!order.validateStock((id) => { ... })) {
    //   throw new Error('Stock insuficiente para uno o más productos');
    // }

    // Persiste la orden
    await this.ordersRepository.save(order);

    // Publica un evento (por ejemplo, order_created)
    await this.eventsService.publishEvent({
      type: 'order_created',
      payload: { orderId: order.id, total: order.total },
    });

    return order;
  }
}
