import {Routes} from '@angular/router';
import {MainLayoutComponent} from '../shared/layout/main-layout.component';
import {AdminLayoutPageComponent} from '../features/admin/admin-layout.page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../features/home/home.page').then((m) => m.HomePageComponent),
      },
      {
        path: 'reservar',
        loadComponent: () => import('../features/booking/booking.page').then((m) => m.BookingPageComponent),
      },
      {
        path: 'gimnasio',
        loadComponent: () => import('../features/gym/gym.page').then((m) => m.GymPageComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('../features/profile/profile.page').then((m) => m.ProfilePageComponent),
      },
      {
        path: 'instalaciones/padel',
        loadComponent: () => import('../features/facilities/facility-padel.page').then((m) => m.FacilityPadelPageComponent),
      },
      {
        path: 'instalaciones/futbol',
        loadComponent: () => import('../features/facilities/facility-futbol.page').then((m) => m.FacilityFutbolPageComponent),
      },
      {
        path: 'instalaciones/gimnasio',
        loadComponent: () => import('../features/facilities/facility-gym.page').then((m) => m.FacilityGymPageComponent),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutPageComponent,
    children: [
      {path: '', redirectTo: 'reservas', pathMatch: 'full'},
      {
        path: 'reservas',
        loadComponent: () => import('../features/admin/admin-reservas.page').then((m) => m.AdminReservasPageComponent),
      },
      {
        path: 'clientes',
        loadComponent: () => import('../features/admin/admin-clientes.page').then((m) => m.AdminClientesPageComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login.page').then((m) => m.LoginPageComponent),
  },
  {path: '**', redirectTo: ''},
];
