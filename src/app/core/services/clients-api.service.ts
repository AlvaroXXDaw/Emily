import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Client, CreateClientRequest} from '../models/client.models';

@Injectable({providedIn: 'root'})
export class ClientsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/clients`;

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  create(payload: CreateClientRequest): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
