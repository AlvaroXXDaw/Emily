import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.page.html',
})
export class AdminLayoutPageComponent {
  auth = inject(AuthStore);
  router = inject(Router);
  isMobileMenuOpen = signal(false);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
