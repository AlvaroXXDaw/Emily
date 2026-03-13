-- Añadir columna password_hash y role a la tabla clients
ALTER TABLE clients ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE clients ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'MEMBER';

-- Contraseña "emily1234" hasheada con BCrypt (coste 10)
UPDATE clients SET password_hash = '$2b$10$Ds7j.nkEMsNIt9S5Ma9T3OQj.Moz3pHx7Hij8geHITB.7wqZSpKt2';

-- El admin tiene rol ADMIN
UPDATE clients SET role = 'ADMIN' WHERE email = 'admin@oasisclub.local';
