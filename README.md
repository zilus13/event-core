# Event Core

Event Core is a NestJS service that manages orders and publishes domain events through RabbitMQ. Orders are stored in PostgreSQL using TypeORM and the service exposes simple HTTP endpoints for creating and cancelling orders.

## Project setup

```bash
npm install
```

## Run the service

```bash
# development
npm run start

# watch mode
npm run start:dev

# production
npm run start:prod
```

## Run tests

```bash
npm run test
```
