# Frontend structure (Angular)

## Carpetas principales
- `app-shell/`: arranque de la app (config, rutas, root component).
- `core/`: modelos, servicios HTTP, estado global y utilidades transversales.
- `shared/`: piezas reutilizables (layout, navbar, UI).
- `features/`: pantallas por dominio funcional.

## Flujo recomendado para codificar a mano
1. Define/ajusta tipos en `core/models`.
2. Implementa llamadas API en `core/services`.
3. Construye UI final en `features/*`.
4. Añade navegación en `app-shell/app.routes.ts`.

## Backend local
- Proxy Angular configurado en `proxy.conf.json`.
- El frontend llama a `/api/v1/*`.

