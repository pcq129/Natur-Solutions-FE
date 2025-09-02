import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base-service';
import { AUTH_API } from '../../../../environments/APIs/authApi';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  private readonly _endpoints = AUTH_API;
  private readonly _httpClient = inject(HttpClient);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  attemptLogin(email: string, password: string, remember: boolean) {
    console.log(email, password, remember);
    this._authService.getCsrfCookie().subscribe(()=>{
      this._authService.login(email, password, remember).subscribe({
        next: (res)=>{
          if(res?.data?.token){
            localStorage.setItem('auth_token', res.data.token);
            this._router.navigate(['home']);
            // show snackbar (pending)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    });
  }
}
