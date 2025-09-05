import { authGuard } from './../guards/auth-guard';
import {
  HttpErrorResponse,
  HttpEventType,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authGuard = inject(AuthService);
  console.log(authGuard);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        authGuard.logout();
      }
      return throwError(() => error);
    })
  );
};
