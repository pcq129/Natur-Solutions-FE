import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../../../core/services/base-service';
import { AUTH_API } from '../../../../environments/APIs/authApi';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import { LoaderService } from '../../../core/services/loader-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _sanckbar = inject(SnackbarService);
  private readonly _loader = inject(LoaderService);

  loginInProgress = signal(false);
  attemptLogin(email: string, password: string, remember: boolean) {
    // this._authService.getCsrfCookie().subscribe(()=>{
    this.loginInProgress.set(true);
    this._loader.show();
    this._authService.login(email, password, remember).subscribe({
      next: (res) => {
        if (res?.data?.token) {
          this._loader.hide();

          localStorage.setItem('auth_token', res.data.token);
          this._router.navigate(['home']);
          this._authService.isLoggedIn.set(true);
          this._sanckbar.success(res.message);
          this.loginInProgress.set(false);
        }
      },
      error: (err) => {
        this._loader.hide();

        this._sanckbar.error(err.error.message);
        this.loginInProgress.set(false);
        console.log(err);
      },
    });
    // });
  }

  logout() {
    this._loader.show();
    this._authService.logout().subscribe({
      next: (res) => {
        this._loader.hide();
        localStorage.removeItem('auth_token');
        this._authService.isLoggedIn.set(false);
        this._sanckbar.success(res.message);
      },
      error: (err) => {
        this._loader.hide();
        this._sanckbar.error(err.error.message);
      },
    });
  }
}
