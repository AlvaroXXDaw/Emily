import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  isAdmin = signal<boolean>(false);

  login() {
    this.isLoggedIn.set(true);
    this.isAdmin.set(false);
  }

  loginAdmin() {
    this.isLoggedIn.set(true);
    this.isAdmin.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.isAdmin.set(false);
  }
}
