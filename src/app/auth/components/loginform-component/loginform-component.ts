import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { ILoginData } from '../login-component/interfaces/ILoginData';
import { LoginService } from '../login-component/login-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loginform-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatCheckboxModule,
    MatInput,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
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

  loginInProgress = computed(()=> this._loginService.loginInProgress());
  login(params: ILoginData) {
    if (this.loginForm.valid) {
      console.log('no error');
      this._loginService.attemptLogin(params.email, params.password, params.remember);
    } else {
      console.log('error');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
