import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedService {
  m_authToken!: string;

  get authToken(): string {
    return localStorage.getItem('auth-token') || '';
  }

  set authToken(token: string) {
    this.m_authToken = token;
    localStorage.setItem('auth-token', this.m_authToken);
  }
}
