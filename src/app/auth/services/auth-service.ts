import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000'; // Laravel backend

  constructor(private http: HttpClient) {}

  // Step 1: Get CSRF cookie
  getCsrfCookie(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  // Step 2: Login
  login(email: string, password: string, remember: boolean): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/user-login`,
      {
        email: email,
        password: password,
        remember: remember,
      },
      {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN'),
        },
      }
    );
  }

  // Step 3: Get authenticated user
  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { withCredentials: true });
  }

  // Step 4: Logout
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  }
}
