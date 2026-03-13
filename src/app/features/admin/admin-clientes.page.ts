import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClientsApiService } from '../../core/services/clients-api.service';
import { Client, ClientPlan, CreateClientRequest } from '../../core/models/client.models';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-clientes.page.html',
})
export class AdminClientesPageComponent implements OnInit {
  private clientsApi = inject(ClientsApiService);

  clients = signal<Client[]>([]);
  loading = signal(true);

  newClient = {
    name: '',
    email: '',
    plan: 'BASIC' as ClientPlan,
    password: '',
  };

  ngOnInit() {
    this.loadClients();
  }

  private loadClients() {
    this.loading.set(true);
    this.clientsApi.getAll().subscribe({
      next: (clients) => {
        this.clients.set(clients);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addClient(event: Event) {
    event.preventDefault();
    if (!this.newClient.name || !this.newClient.email || !this.newClient.password) return;

    const request: CreateClientRequest = {
      name: this.newClient.name,
      email: this.newClient.email,
      plan: this.newClient.plan,
      password: this.newClient.password,
    };

    this.clientsApi.create(request).subscribe({
      next: (client) => {
        this.clients.update((c) => [client, ...c]);
        this.newClient.name = '';
        this.newClient.email = '';
        this.newClient.password = '';
        this.newClient.plan = 'BASIC';
      },
    });
  }

  removeClient(id: string) {
    this.clientsApi.delete(id).subscribe({
      next: () => {
        this.clients.update((c) => c.filter((client) => client.id !== id));
      },
    });
  }
}
