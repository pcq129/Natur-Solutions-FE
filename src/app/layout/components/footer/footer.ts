import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatInputModule, ReactiveFormsModule, MatIcon, MatButtonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  subscribeNewsLetter(email: string) {
    throw new Error('Method not implemented. Email:'+ email);
  }
  emailFormControl = new FormControl('', [Validators.email]);
  matcher = {
    isErrorState: (control: FormControl | null): boolean =>
      !!control && control.invalid && (control.dirty || control.touched),
  };
}
