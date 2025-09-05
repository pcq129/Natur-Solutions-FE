import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../core/services/base-service';
import { ISignUpData } from '../interface/ISignUpData';
import { AUTH_API } from '../../../../../environments/APIs/authApi';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/services/snackbar-service';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends BaseService {
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(SnackbarService);

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
          this._snackbar.success('Signed Up Successfully');
          this._router.navigate(['home']);
        },
        error: (err) => {
          this._snackbar.error(err.error.message);
        },
      });
  }
}
