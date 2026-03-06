import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BookComponent } from './book.component';
import { GymComponent } from './gym.component';
import { LoginComponent } from './login.component';
import { FacilityPadelComponent } from './facility-padel.component';
import { FacilityFutbolComponent } from './facility-futbol.component';
import { FacilityGymComponent } from './facility-gym.component';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminReservasComponent } from './admin-reservas.component';
import { AdminClientesComponent } from './admin-clientes.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'reservar', component: BookComponent },
      { path: 'gimnasio', component: GymComponent },
      { path: 'perfil', component: ProfileComponent },
      { path: 'instalaciones/padel', component: FacilityPadelComponent },
      { path: 'instalaciones/futbol', component: FacilityFutbolComponent },
      { path: 'instalaciones/gimnasio', component: FacilityGymComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'reservas', pathMatch: 'full' },
      { path: 'reservas', component: AdminReservasComponent },
      { path: 'clientes', component: AdminClientesComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
