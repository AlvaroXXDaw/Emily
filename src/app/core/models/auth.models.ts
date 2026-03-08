export type UserRole = 'ADMIN' | 'MEMBER';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSession {
  sessionId: string;
  clientId: string;
  name: string;
  email: string;
  role: UserRole;
}
