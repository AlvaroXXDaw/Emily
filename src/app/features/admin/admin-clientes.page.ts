import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Client {
  id: string;
  name: string;
  email: string;
  plan: 'Básico' | 'Premium';
  joinDate: string;
}

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-clientes.page.html',
})
export class AdminClientesPageComponent {
  clients = signal<Client[]>([
    { id: '1', name: 'Álvaro Martínez', email: 'alvaro@example.com', plan: 'Premium', joinDate: '2026-01-15' },
    { id: '2', name: 'Laura Sánchez', email: 'laura@example.com', plan: 'Básico', joinDate: '2026-02-20' },
  ]);

  newClient = {
    name: '',
    email: '',
    plan: 'Básico' as 'Básico' | 'Premium'
  };

  addClient(event: Event) {
    event.preventDefault();
    if (!this.newClient.name || !this.newClient.email) return;

    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const client: Client = {
      id: Date.now().toString(),
      name: this.newClient.name,
      email: this.newClient.email,
      plan: this.newClient.plan,
      joinDate: dateStr
    };

    this.clients.update(c => [client, ...c]);
    
    // Reset form
    this.newClient.name = '';
    this.newClient.email = '';
    this.newClient.plan = 'Básico';
  }

  removeClient(id: string) {
    this.clients.update(c => c.filter(client => client.id !== id));
  }
}


