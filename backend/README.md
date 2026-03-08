# Backend (Spring Boot)

Backend API con estructura sencilla tipo junior:
- controller
- service
- repository
- entity
- dto
- mapper

## Requisitos
- Java 21
- Docker (opcional para levantar Postgres local)

## Variables de entorno
Puedes copiar `backend/.env.example` y usar tus propias credenciales:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `PORT` (opcional, por defecto 8080)

## Levantar PostgreSQL local (opcional)
Desde la raíz del proyecto:

```bash
npm run db:up
```

## Ejecutar backend
En Windows:

```bash
backend\\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

En Linux/macOS:

```bash
./backend/mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## Endpoints principales
Base URL: `http://localhost:8080/api/v1`

- `POST /auth/login`
- `GET/POST/DELETE /clients`
- `GET/POST/DELETE /reservations`
- `POST /reservations/maintenance`
- `GET /availability`
- `GET /profile/{clientId}`
- `GET/PUT /gym/routines/{clientId}`

## Swagger
Con la app levantada:

- `http://localhost:8080/swagger-ui.html`

