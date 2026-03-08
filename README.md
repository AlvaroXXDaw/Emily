# Emily Project

Proyecto con frontend Angular y backend Spring Boot.

## Estructura
- `src/app/app-shell`: bootstrap/config/rutas del frontend
- `src/app/core`: estado global, modelos y servicios HTTP
- `src/app/shared`: layout y componentes reutilizables
- `src/app/features`: páginas funcionales por dominio
- `backend/`: API Spring Boot (DTO + Entity + Controller + Repository + Mapper + Service)
- `docker-compose.yml`: PostgreSQL local para desarrollo

## Backend preparado para PostgreSQL con tus credenciales
El backend usa variables de entorno para conectarse a una base PostgreSQL que tú proporcionas.

Variables requeridas:
- `DB_URL` (ej: `jdbc:postgresql://localhost:5432/emily`)
- `DB_USERNAME`
- `DB_PASSWORD`

Opcional:
- `PORT` (por defecto `8080`)

Puedes usar `backend/.env.example` como referencia.

## Levantar PostgreSQL local (opcional)
Desde la raíz:

```bash
npm run db:up
```

## Ejecutar backend
Windows:

```bash
npm run dev:backend
```

Linux/macOS:

```bash
./backend/mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Swagger:
- `http://localhost:8080/swagger-ui.html`

## Ejecutar frontend
```bash
npm install
npm run dev
```

Notas frontend:
- proxy de API: [proxy.conf.json](./proxy.conf.json)
- base URL API: `src/environments/environment*.ts` (`/api/v1`)


