// src/interfaces/orders/orders.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import {
  CreateOrderUseCase,
  CreateOrderDto,
} from '../../application/orders/create-order.usecase';

@Controller('orders')
export class OrdersController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.createOrderUseCase.execute(createOrderDto);
    return { message: 'Order created successfully', order };
  }
}
