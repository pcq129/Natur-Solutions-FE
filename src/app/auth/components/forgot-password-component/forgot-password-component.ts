import { Component, inject } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { MatInput, MatInputModule } from "@angular/material/input";
import { SnackbarService } from '../../../shared/services/snackbar-service';

@Component({
  selector: 'app-forgot-password-component',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, RouterModule, MatInputModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.scss'
})
export class ForgotPasswordComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(SnackbarService);

  forgotPasswordForm = this._formBuilder.nonNullable.group({
    email : this._formBuilder.nonNullable.control('', [Validators.required, Validators.email])
  });

  requestReset(email : IForgotPasswordFormData){
    if(this.forgotPasswordForm.valid){
      this._authService.requestPasswordReset(email).subscribe({
        next: (res: any)=>{
          this._router.navigate(['/home']);
          this._snackbar.success(res.message);
        },
        error: (err) => {
          console.log(err);
          if(err.status === 404){
            this._snackbar.error(err.error.message);
            this._router.navigate(['/login'])
          }else{
            this._snackbar.error(err.error.message);
            this._router.navigate(['/login'])
          }

        }
      })
    }
  }

}

export interface IForgotPasswordFormData {
  email: string
}
