import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './interfaces/module/events.module';
import { EventsService } from './application/events/events.service';
import { EventsController } from './interfaces/events/events.controller';
import { EventsConsumer } from './application/events/events.consumer';
import { OrdersController } from './interfaces/orders/orders.controller';
import { OrdersRepository } from './infrastructure/orders/orders.repository';
import { CreateOrderUseCase } from './application/orders/create-order.usecase';

@Module({
  imports: [EventsModule],
  controllers: [
    AppController,
    EventsController,
    EventsConsumer,
    OrdersController,
  ],
  providers: [AppService, EventsService, CreateOrderUseCase, OrdersRepository],
})
export class AppModule {}
