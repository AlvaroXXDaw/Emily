CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  plan VARCHAR(30) NOT NULL,
  join_date DATE NOT NULL,
  subscription_name VARCHAR(80) NOT NULL,
  subscription_status VARCHAR(30) NOT NULL,
  next_billing_date DATE NOT NULL,
  subscription_amount_cents INTEGER NOT NULL
);

CREATE TABLE reservations (
  id UUID PRIMARY KEY,
  client_id UUID NULL,
  user_name VARCHAR(120) NOT NULL,
  sport VARCHAR(20) NOT NULL,
  court_name VARCHAR(120) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_reservation_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE gym_routine_days (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL,
  day_order INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  CONSTRAINT fk_routine_day_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE gym_routine_exercises (
  id UUID PRIMARY KEY,
  routine_day_id UUID NOT NULL,
  exercise_order INTEGER NOT NULL,
  name VARCHAR(160) NOT NULL,
  sets_count INTEGER NOT NULL,
  reps VARCHAR(30) NOT NULL,
  rest_interval VARCHAR(30) NOT NULL,
  CONSTRAINT fk_exercise_day FOREIGN KEY (routine_day_id) REFERENCES gym_routine_days(id) ON DELETE CASCADE
);

CREATE INDEX idx_reservation_date_sport ON reservations (reservation_date, sport);
CREATE INDEX idx_reservation_client ON reservations (client_id);
CREATE INDEX idx_routine_day_client ON gym_routine_days (client_id, day_order);

INSERT INTO clients (id, name, email, plan, join_date, subscription_name, subscription_status, next_billing_date, subscription_amount_cents) VALUES
('11111111-1111-1111-1111-111111111111', 'Álvaro Martínez', 'alvaro@example.com', 'PREMIUM', DATE '2026-01-15', 'Premium Mensual', 'ACTIVA', DATE '2026-04-15', 5999),
('22222222-2222-2222-2222-222222222222', 'Laura Sánchez', 'laura@example.com', 'BASIC', DATE '2026-02-20', 'Básico Mensual', 'ACTIVA', DATE '2026-04-10', 3999),
('33333333-3333-3333-3333-333333333333', 'Admin Club', 'admin@oasisclub.local', 'PREMIUM', DATE '2025-12-01', 'Premium Mensual', 'ACTIVA', DATE '2026-04-01', 0);

INSERT INTO reservations (id, client_id, user_name, sport, court_name, reservation_date, reservation_time, status, created_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Álvaro Martínez', 'PADEL', 'Pista Cristal 1', DATE '2026-03-10', TIME '18:00:00', 'PENDING', CURRENT_TIMESTAMP),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Álvaro Martínez', 'FUTBOL', 'Pista 2 (F7)', DATE '2026-03-05', TIME '20:00:00', 'COMPLETED', CURRENT_TIMESTAMP),
('cccccccc-cccc-cccc-cccc-cccccccccccc', NULL, 'Mantenimiento', 'PADEL', 'Pista Muro', DATE '2026-03-06', TIME '10:00:00', 'MAINTENANCE', CURRENT_TIMESTAMP),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'Laura Sánchez', 'FUTBOL', 'Pista 1 (F11)', DATE '2026-03-06', TIME '19:30:00', 'ACTIVE', CURRENT_TIMESTAMP);

INSERT INTO gym_routine_days (id, client_id, day_order, name) VALUES
('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', 1, 'Fuerza'),
('44444444-4444-4444-4444-444444444442', '11111111-1111-1111-1111-111111111111', 2, 'Cardio'),
('44444444-4444-4444-4444-444444444443', '11111111-1111-1111-1111-111111111111', 3, 'Core');

INSERT INTO gym_routine_exercises (id, routine_day_id, exercise_order, name, sets_count, reps, rest_interval) VALUES
('55555555-5555-5555-5555-555555555551', '44444444-4444-4444-4444-444444444441', 1, 'Sentadilla Libre', 4, '10', '90s'),
('55555555-5555-5555-5555-555555555552', '44444444-4444-4444-4444-444444444441', 2, 'Press de Banca', 4, '8', '90s'),
('55555555-5555-5555-5555-555555555553', '44444444-4444-4444-4444-444444444441', 3, 'Dominadas', 3, '10', '60s');

