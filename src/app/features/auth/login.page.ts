import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService } from '../../core/services/auth-api.service';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.page.html',
})
export class LoginPageComponent {
  private authApi = inject(AuthApiService);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = signal('');
  loading = signal(false);

  submitLogin() {
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.errorMessage.set('');

    this.authApi.login({ email: this.email, password: this.password }).subscribe({
      next: (session) => {
        this.authStore.setSession(session);
        this.loading.set(false);

        if (session.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Email o contraseña incorrectos');
      },
    });
  }

  devLogin() {
    this.email = 'alvaro@example.com';
    this.password = 'emily1234';
    this.submitLogin();
  }

  devAdminLogin() {
    this.email = 'admin@oasisclub.local';
    this.password = 'emily1234';
    this.submitLogin();
  }
}
