import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { LoginService } from './login-service';
import { ILoginData } from './interfaces/ILoginData';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [MatInputModule, ReactiveFormsModule,MatFormFieldModule, RouterOutlet, MatCheckboxModule],
  templateUrl: './login-layout.html',
  styleUrl: './login-layout.scss',
})
export class LoginLayout {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _loginService = inject(LoginService);

  loginForm = this._formBuilder.nonNullable.group({
    email: this._formBuilder.nonNullable.control('user@gmail.com', [Validators.required, Validators.email]),
    password: this._formBuilder.nonNullable.control('12341234', [Validators.required]),
    remember: this._formBuilder.nonNullable.control(false),
  });

  protected login(params: ILoginData) {
    this._loginService.attemptLogin(params.email, params.password, params.remember);
  }
}
