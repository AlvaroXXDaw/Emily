import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Reservation {
  id: string;
  user: string;
  sport: 'Fútbol' | 'Pádel';
  court: string;
  date: string;
  time: string;
  status: 'Activa' | 'Mantenimiento';
}

@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-reservas.page.html',
})
export class AdminReservasPageComponent {
  filterSport = signal<'Todos' | 'Fútbol' | 'Pádel'>('Todos');
  
  reservations = signal<Reservation[]>([
    { id: '1', user: 'Carlos Ruiz', sport: 'Pádel', court: 'Pista Cristal 1', date: '2026-03-05', time: '18:00', status: 'Activa' },
    { id: '2', user: 'Ana Gómez', sport: 'Fútbol', court: 'Pista 2 (F7)', date: '2026-03-05', time: '19:30', status: 'Activa' },
    { id: '3', user: 'Mantenimiento', sport: 'Pádel', court: 'Pista Muro', date: '2026-03-06', time: '10:00', status: 'Mantenimiento' },
    { id: '4', user: 'David López', sport: 'Fútbol', court: 'Pista 1 (F11)', date: '2026-03-06', time: '20:00', status: 'Activa' },
  ]);

  blockForm = {
    sport: 'Pádel',
    court: 'Pista Cristal 1',
    date: '',
    time: ''
  };

  filteredReservations() {
    if (this.filterSport() === 'Todos') return this.reservations();
    return this.reservations().filter(r => r.sport === this.filterSport());
  }

  cancelReservation(id: string) {
    this.reservations.update(res => res.filter(r => r.id !== id));
  }

  removeMaintenance(id: string) {
    this.reservations.update(res => res.filter(r => r.id !== id));
  }

  blockCourt(event: Event) {
    event.preventDefault();
    if (!this.blockForm.date || !this.blockForm.time) return;

    const newBlock: Reservation = {
      id: Date.now().toString(),
      user: 'Mantenimiento',
      sport: this.blockForm.sport as 'Fútbol' | 'Pádel',
      court: this.blockForm.court,
      date: this.blockForm.date,
      time: this.blockForm.time,
      status: 'Mantenimiento'
    };

    this.reservations.update(res => [newBlock, ...res]);
    
    // Reset form
    this.blockForm.date = '';
    this.blockForm.time = '';
  }
}



