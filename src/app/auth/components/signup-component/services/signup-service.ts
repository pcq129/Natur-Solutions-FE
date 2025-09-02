import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../core/services/base-service';
import { ISignUpData } from '../interface/ISignUpData';
import { AUTH_API } from '../../../../../environments/APIs/authApi';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends BaseService {
  private readonly _router = inject(Router);

  signup(signupData: ISignUpData) {
    this._http
      .postRequest(this._apiBaseUrl + AUTH_API.SIGNUP, {
        name: signupData.name,
        password: signupData.password,
        password_confirmation: signupData.passwordConfirmation,
        email: signupData.email,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
