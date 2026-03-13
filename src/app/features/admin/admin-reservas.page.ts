import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReservationsApiService } from '../../core/services/reservations-api.service';
import { Reservation, SportType, CreateMaintenanceBlockRequest } from '../../core/models/reservation.models';

@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-reservas.page.html',
})
export class AdminReservasPageComponent implements OnInit {
  private reservationsApi = inject(ReservationsApiService);

  filterSport = signal<'Todos' | 'FUTBOL' | 'PADEL'>('Todos');
  reservations = signal<Reservation[]>([]);
  loading = signal(true);

  blockForm = {
    sport: 'PADEL' as SportType,
    court: 'Pista Cristal 1',
    date: '',
    time: '',
  };

  ngOnInit() {
    this.loadReservations();
  }

  private loadReservations() {
    this.loading.set(true);
    const filters = this.filterSport() === 'Todos' ? {} : { sport: this.filterSport() as SportType };

    this.reservationsApi.getAll(filters).subscribe({
      next: (reservations) => {
        this.reservations.set(reservations);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  applyFilter(sport: 'Todos' | 'FUTBOL' | 'PADEL') {
    this.filterSport.set(sport);
    this.loadReservations();
  }

  filteredReservations() {
    return this.reservations();
  }

  cancelReservation(id: string) {
    this.reservationsApi.delete(id).subscribe({
      next: () => this.reservations.update((res) => res.filter((r) => r.id !== id)),
    });
  }

  removeMaintenance(id: string) {
    this.cancelReservation(id);
  }

  blockCourt(event: Event) {
    event.preventDefault();
    if (!this.blockForm.date || !this.blockForm.time) return;

    const request: CreateMaintenanceBlockRequest = {
      sport: this.blockForm.sport,
      court: this.blockForm.court,
      date: this.blockForm.date,
      time: this.blockForm.time + ':00',
    };

    this.reservationsApi.createMaintenance(request).subscribe({
      next: (reservation) => {
        this.reservations.update((res) => [reservation, ...res]);
        this.blockForm.date = '';
        this.blockForm.time = '';
      },
    });
  }
}
