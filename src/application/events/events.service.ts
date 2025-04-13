// src/application/events/events.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService implements OnModuleInit {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'event_queue',
      queueOptions: { durable: false },
    },
  })
  private client: ClientProxy;

  async onModuleInit() {
    // Espera a que el cliente se conecte
    await this.client.connect();
  }

  async publishEvent(event: any) {
    console.log('Emitiendo evento:', event);
    try {
      await firstValueFrom(this.client.emit('new_event', event));
    } catch (err) {
      console.warn(
        'Error al emitir el evento (posiblemente se deba a falta de consumer):',
        err,
      );
    }
  }
}
