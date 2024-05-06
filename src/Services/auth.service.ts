// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`http://localhost:5017/api/Account/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5017/api/Account/register`, user);
  }

  logout(): void {
    // Remove token from storage
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    // Check if token exists and not expired
    const token = this.getToken();
    // Add your logic to check if token is valid (e.g., not expired)
    return !!token;
  }
  getCurrentUser(email: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5017/api/Account/userId?email=${email}`);
  }
}
