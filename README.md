# Event Core

Event Core is a small NestJS service that manages orders and publishes domain events over RabbitMQ while persisting data in PostgreSQL. The codebase follows a **Clean Architecture** style that separates business logic from infrastructure concerns.

## Project Structure

```
src/
  domain/        # entities and business rules
  application/   # use cases and services
  infrastructure/ # database and message implementations
  interfaces/    # HTTP controllers and consumers
  app.module.ts  # module wiring
  main.ts        # bootstrap file
```

## Getting Started

Install dependencies and start the service in development mode:

```bash
npm install
npm run start:dev
```

To build and run the project in Docker:

```bash
docker build -t event-core .
docker run -p 3000:3000 event-core
```

## Testing

Run the unit tests:

```bash
npm test
```

End-to-end tests are available with:

```bash
npm run test:e2e
```
