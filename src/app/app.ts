import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import 'zone.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('natur_solutions');
}
