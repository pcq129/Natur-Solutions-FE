import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ISignUpData } from './interface/ISignUpData';
import { SignupService } from './services/signup-service';

@Component({
  selector: 'app-signup-component',
  imports: [ReactiveFormsModule,FormsModule,MatFormFieldModule, MatInput, MatCheckboxModule, MatButtonModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss'
})
export class SignupComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _signupService = inject(SignupService);

  protected signupForm = this._formBuilder.group({
    name : this._formBuilder.nonNullable.control('testasdfasdf', [Validators.required, Validators.minLength(6)]),
    email : this._formBuilder.nonNullable.control('test@test.company', [Validators.required,Validators.email]),
    password : this._formBuilder.nonNullable.control('asdQSDFKFJf@a1341', [Validators.required]),
    passwordConfirmation : this._formBuilder.nonNullable.control('asdQSDFKFJf@a1341', [Validators.required]),
    agreeToS : this._formBuilder.nonNullable.control(false, [Validators.required])
  });

  protected signup(signupData : ISignUpData) {
    if(this.signupForm.valid){
      this._signupService.signup(signupData);
    }
  }

}
