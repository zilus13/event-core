import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { OrderEntity } from './domain/orders/orders.entity';
import { EventsModule } from './interfaces/module/events.module';
import { EventsService } from './application/events/events.service';
import { EventsConsumer } from './application/events/events.consumer';
import { OrdersController } from './interfaces/orders/orders.controller';
import { EventsController } from './interfaces/events/events.controller';
import { OrdersRepository } from './infrastructure/orders/orders.repository';
import { CreateOrderUseCase } from './application/orders/create-order.usecase';
import { CancelOrderUseCase } from './application/orders/cancel-order.usecase';

@Module({
  imports: [
    EventsModule,
    // Configuración básica de TypeORM:
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser', // Debe coincidir con POSTGRES_USER
      password: 'mysecretpassword', // Debe coincidir con POSTGRES_PASSWORD
      database: 'mydatabase', // Debe coincidir con POSTGRES_DB
      entities: [OrderEntity],
      synchronize: true, // Solo para desarrollo. En producción se recomienda usar migraciones.
    }),
    // Registra las entidades en el ámbito del módulo:
    TypeOrmModule.forFeature([OrderEntity]),
  ],
  controllers: [
    AppController,
    EventsController,
    EventsConsumer,
    OrdersController,
  ],
  providers: [
    AppService,
    EventsService,
    CreateOrderUseCase,
    CreateOrderUseCase,
    CancelOrderUseCase,
    OrdersRepository,
  ],
})
export class AppModule {}
