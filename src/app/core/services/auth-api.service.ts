import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {AuthSession, LoginRequest} from '../models/auth.models';

@Injectable({providedIn: 'root'})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  login(payload: LoginRequest): Observable<AuthSession> {
    return this.http.post<AuthSession>(`${this.baseUrl}/login`, payload);
  }
}
