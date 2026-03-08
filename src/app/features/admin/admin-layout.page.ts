import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.page.html',
})
export class AdminLayoutPageComponent {
  auth = inject(AuthService);
  router = inject(Router);
  isMobileMenuOpen = signal(false);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

