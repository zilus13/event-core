// src/interfaces/events/events.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from '../../application/events/events.service';

export class CreateEventDto {
  readonly type: string;
  readonly payload: any;
}

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    // Publica el evento en RabbitMQ
    this.eventsService.publishEvent(createEventDto);

    return {
      message: 'Evento creado exitosamente y publicado en RabbitMQ',
      event: createEventDto,
    };
  }
}
