import { Injectable, computed, signal } from '@angular/core';

type UserRole = 'member' | 'admin';

interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
}

const AUTH_STORAGE_KEY = 'emily.auth.user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<AuthUser | null>(this.readFromStorage());
  isLoggedIn = computed(() => this.currentUser() !== null);
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  login(email = 'socio@club.com', name = 'Socio') {
    const user: AuthUser = {
      email: email.trim().toLowerCase(),
      name: name.trim() || 'Socio',
      role: 'member',
    };

    this.currentUser.set(user);
    this.saveToStorage(user);
  }

  loginAdmin(email = 'admin@club.com', name = 'Administrador') {
    const user: AuthUser = {
      email: email.trim().toLowerCase(),
      name: name.trim() || 'Administrador',
      role: 'admin',
    };

    this.currentUser.set(user);
    this.saveToStorage(user);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  private saveToStorage(user: AuthUser) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  private readFromStorage(): AuthUser | null {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as AuthUser;
      if (!parsed?.email) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }
}
