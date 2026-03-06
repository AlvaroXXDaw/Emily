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
  template: `
    <div class="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
      <div class="mb-12">
        <h2 class="text-4xl font-light tracking-tighter text-emerald-950 uppercase mb-2">Gestión de Clientes</h2>
        <p class="text-gray-500 font-light">Añade nuevos socios al club y gestiona sus suscripciones.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Añadir Cliente -->
        <div class="bg-white border border-black/5 p-6 md:p-8 h-fit">
          <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">Añadir Nuevo Socio</h3>
          
          <form (submit)="addClient($event)" class="space-y-6">
            <div>
              <span class="block text-xs font-semibold tracking-[0.1em] text-gray-400 uppercase mb-2">Nombre Completo</span>
              <input type="text" [(ngModel)]="newClient.name" name="name" required class="w-full border-b border-black/10 py-2 text-emerald-950 focus:border-emerald-950 focus:outline-none bg-transparent text-sm">
            </div>
            
            <div>
              <span class="block text-xs font-semibold tracking-[0.1em] text-gray-400 uppercase mb-2">Correo Electrónico</span>
              <input type="email" [(ngModel)]="newClient.email" name="email" required class="w-full border-b border-black/10 py-2 text-emerald-950 focus:border-emerald-950 focus:outline-none bg-transparent text-sm">
            </div>
            
            <div>
              <span class="block text-xs font-semibold tracking-[0.1em] text-gray-400 uppercase mb-2">Plan de Suscripción</span>
              <select [(ngModel)]="newClient.plan" name="plan" class="w-full border-b border-black/10 py-2 text-emerald-950 focus:border-emerald-950 focus:outline-none bg-transparent text-sm">
                <option value="Básico">Básico</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <button type="submit" class="w-full bg-emerald-950 text-white py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-emerald-900 transition-colors mt-4">
              Registrar Socio
            </button>
          </form>
        </div>

        <!-- Lista de Clientes -->
        <div class="lg:col-span-2 bg-white border border-black/5 p-6 md:p-8">
          <h3 class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">Directorio de Socios</h3>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-black/10">
                  <th class="pb-4 text-xs font-semibold tracking-[0.1em] uppercase text-gray-400">Nombre</th>
                  <th class="pb-4 text-xs font-semibold tracking-[0.1em] uppercase text-gray-400">Contacto</th>
                  <th class="pb-4 text-xs font-semibold tracking-[0.1em] uppercase text-gray-400">Plan</th>
                  <th class="pb-4 text-xs font-semibold tracking-[0.1em] uppercase text-gray-400">Alta</th>
                  <th class="pb-4"></th>
                </tr>
              </thead>
              <tbody class="text-sm font-light text-gray-600">
                @for (client of clients(); track client.id) {
                  <tr class="border-b border-black/5 hover:bg-gray-50 transition-colors">
                    <td class="py-4 font-medium text-emerald-950">{{ client.name }}</td>
                    <td class="py-4">{{ client.email }}</td>
                    <td class="py-4">
                      <span 
                        [class.bg-emerald-100]="client.plan === 'Premium'"
                        [class.text-emerald-800]="client.plan === 'Premium'"
                        [class.bg-gray-100]="client.plan === 'Básico'"
                        [class.text-gray-800]="client.plan === 'Básico'"
                        class="px-2 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-sm">
                        {{ client.plan }}
                      </span>
                    </td>
                    <td class="py-4">{{ client.joinDate }}</td>
                    <td class="py-4 text-right">
                      <button (click)="removeClient(client.id)" class="text-xs font-semibold tracking-[0.1em] uppercase text-red-500 hover:text-red-700 transition-colors">
                        Baja
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
            
            @if (clients().length === 0) {
              <div class="py-12 text-center text-gray-400 font-light text-sm">
                No hay socios registrados.
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class AdminClientesComponent {
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
