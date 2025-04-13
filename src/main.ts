import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  // Crea la aplicación HTTP
  const app = await NestFactory.create(AppModule);

  // Conecta el microservicio con RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'event_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // Arranca el microservicio y la aplicación HTTP
  await app.startAllMicroservices();
  await app.listen(3000);
}

void bootstrap();
