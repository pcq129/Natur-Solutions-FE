import { IResetPasswordData } from './../components/reset-password-component/reset-password-component';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IForgotPasswordFormData } from '../components/forgot-password-component/forgot-password-component';
import { SnackbarService } from '../../shared/services/snackbar-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000'; // Laravel backend
  private readonly _http = inject(HttpClient);
  private readonly _snackbar = inject(SnackbarService);

  // Step 1: Get CSRF cookie
  getCsrfCookie(): Observable<any> {
    return this._http.get(`${this.baseUrl}/sanctum/csrf-cookie`, {
      // withCredentials: true,
    });
  }

  // Step 2: Login
  login(email: string, password: string, remember: boolean): Observable<any> {
    return this._http.post(
      `${this.baseUrl}/api/user-login`,
      {
        email: email,
        password: password,
        remember: remember,
      },
      {
        // withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN'),
        },
      }
    );
  }

  // Step 3: Get authenticated user
  getUser(): Observable<any> {
    return this._http.get(`${this.baseUrl}/user`);
  }

  // Step 4: Logout
  logout(): Observable<any> {
    return this._http.post(
      `${this.baseUrl}/api/user-logout`,
      {},
      {
        headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem('auth_token')
        },
      }
    );
  }

  getCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  }

  requestPasswordReset(email: IForgotPasswordFormData) {
    return this._http.post(
      `${this.baseUrl}/api/forgot-password`,
      {
        email: email.email,
      },
      // { withCredentials: true }
    );
  }

  resetPassword(data: IResetPasswordData) {
    return this._http.post(`${this.baseUrl}/api/reset-password`, data,
      // { withCredentials: true }
    );
  }

  isLoggedIn = signal<boolean>(localStorage.getItem('auth_token') ? true : false);
  
}
