-- Añadir columna password_hash y role a la tabla clients
ALTER TABLE clients ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE clients ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'MEMBER';

-- Contraseña "emily1234" hasheada con BCrypt (coste 10)
UPDATE clients SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

-- El admin tiene rol ADMIN
UPDATE clients SET role = 'ADMIN' WHERE email = 'admin@oasisclub.local';
