import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ILoginData } from '../login-component/interfaces/ILoginData';
import { LoginService } from '../login-component/login-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-loginform-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatCheckboxModule,
    MatInput,
  ],
  templateUrl: './loginform-component.html',
  styleUrl: './loginform-component.scss',
})
export class LoginformComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _loginService = inject(LoginService);

  loginForm = this._formBuilder.nonNullable.group({
    email: this._formBuilder.nonNullable.control('user@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.nonNullable.control('12341234', [Validators.required]),
    remember: this._formBuilder.nonNullable.control(false),
  });

  login(params: ILoginData) {
    if (this.loginForm.valid) {
      console.log('no error');
      this._loginService.attemptLogin(params.email, params.password, params.remember);
    }else{
      console.log('error');
    }
  }
}
