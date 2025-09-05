import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly _snackbar = inject(MatSnackBar);

  success(message: string, duration?: number) {
    const snackbarTimeout = duration ?? 3000;
    return this._snackbar.open(message, undefined, {
      panelClass: ['snackbar-success'],
      duration: snackbarTimeout,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    });
  }

  info(message: string, duration?: number) {
    const snackbarTimeout = duration ?? 3000;
    return this._snackbar.open(message, undefined, {
      panelClass: ['snackbar-info'],
      duration: snackbarTimeout,
      verticalPosition: 'top',
      horizontalPosition: 'end'

    });
  }

  error(message: string, duration?: number) {
    const snackbarTimeout = duration ?? 3000;
    return this._snackbar.open(message, undefined, {
      panelClass: ['snackbar-error'],
      duration: snackbarTimeout,
      verticalPosition: 'top',
      horizontalPosition: 'end'

    });
  }
}
