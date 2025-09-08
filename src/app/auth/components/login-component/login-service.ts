import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base-service';
import { AUTH_API } from '../../../../environments/APIs/authApi';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  private readonly _endpoints = AUTH_API;
  private readonly _httpClient = inject(HttpClient);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _sanckbar = inject(SnackbarService);

  attemptLogin(email: string, password: string, remember: boolean) {
    console.log(email, password, remember);
    // this._authService.getCsrfCookie().subscribe(()=>{
    this._authService.login(email, password, remember).subscribe({
      next: (res) => {
        if (res?.data?.token) {
          localStorage.setItem('auth_token', res.data.token);
          this._router.navigate(['home']);
          this._authService.isLoggedIn.set(true);
          this._sanckbar.success(res.message);
        }
      },
      error: (err) => {
        this._sanckbar.error(err.error.message);
        console.log(err);
      },
    });
    // });
  }

  logout() {
    this._authService.logout().subscribe({
      next: (res) => {
        localStorage.removeItem('auth_token');
        this._authService.isLoggedIn.set(false);
        this._sanckbar.success(res.message);
      },
      error: (err) => {
        this._sanckbar.error(err.error.message);
      },
    });
  }
}
