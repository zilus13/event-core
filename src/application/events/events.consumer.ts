// src/application/events/events.consumer.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EventsConsumer {
  @EventPattern('new_event')
  handleNewEvent(@Payload() data: any) {
    console.log('Evento recibido:', data);
    // Aquí puedes procesar el evento (por ejemplo, almacenar en BD, llamar a otro servicio, etc.)
  }
}
