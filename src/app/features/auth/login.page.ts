import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.page.html',
})
export class LoginPageComponent {
  auth = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';

  submitLogin() {
    const cleanEmail = this.email.trim() || 'socio@club.com';
    const defaultName = cleanEmail.split('@')[0] || 'Socio';
    this.auth.login(cleanEmail, defaultName);
    this.router.navigate(['/']);
  }

  devLogin() {
    const cleanEmail = this.email.trim() || 'socio@club.com';
    const defaultName = cleanEmail.split('@')[0] || 'Socio';
    this.auth.login(cleanEmail, defaultName);
    this.router.navigate(['/']);
  }

  devAdminLogin() {
    const cleanEmail = this.email.trim() || 'admin@club.com';
    const defaultName = cleanEmail.split('@')[0] || 'Administrador';
    this.auth.loginAdmin(cleanEmail, defaultName);
    this.router.navigate(['/admin']);
  }
}
