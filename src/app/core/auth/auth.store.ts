import {computed, Injectable, signal} from '@angular/core';

import {AuthSession} from '../models/auth.models';

const STORAGE_KEY = 'emily.auth.session';

@Injectable({providedIn: 'root'})
export class AuthStore {
  private readonly _session = signal<AuthSession | null>(this.loadFromStorage());

  readonly session = this._session.asReadonly();
  readonly isLoggedIn = computed(() => this._session() !== null);
  readonly isAdmin = computed(() => this._session()?.role === 'ADMIN');

  setSession(session: AuthSession) {
    this._session.set(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  logout() {
    this._session.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}
