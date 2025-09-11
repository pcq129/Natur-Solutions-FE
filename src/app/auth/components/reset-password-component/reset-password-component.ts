import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInput, MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmValidator } from '../../../shared/directives/confirm-password.directive';
import { AuthService } from '../../services/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../../shared/services/snackbar-service';

@Component({
  selector: 'app-reset-password-component',
  imports: [FormsModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.scss',
})
export class ResetPasswordComponent implements OnInit {
  ngOnInit(): void {
    this._route.queryParams.subscribe({
      next: (res) => {
        this.token = res['token'];
        this.email = res['email'];
      },
    });
  }
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  private readonly _snackbar = inject(SnackbarService);

  private token: string = '';
  private email: string = '';

  resetPasswordForm = this._formBuilder.nonNullable.group({
    // email: this._formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.nonNullable.control('', [Validators.required]),
    confirmPassword: this._formBuilder.nonNullable.control('', [
      Validators.required,
      ConfirmValidator('password'),
    ]),
  });

  resetPassword(resetData: IResetPasswordData) {
    if (this.resetPasswordForm.valid) {
      resetData.token = this.token;
      resetData.email = this.email;
      this._authService.resetPassword(resetData).subscribe({
        next: (res: any
        ) => {
          this._snackbar.success(res.message);
          this._router.navigate(['home']);
        },
        error: (err) => {
          this._snackbar.error(err.error.message);
          console.log(err);
        }
      });
    }
  }
}

export interface IResetPasswordData {
  email?: string;
  password: string;
  confirmPassword: string;
  token?: string;
}
