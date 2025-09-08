import { ResolveFn } from '@angular/router';
import { ICms } from '../interfaces';
import { inject } from '@angular/core';
import { CmsService } from '../services/cms-service';
import { catchError, map, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../../../shared/services/snackbar-service';

export const cmsResolverResolver: ResolveFn<ICms> = (route, state) => {
  console.log('In resolver');
  const _cmsService = inject(CmsService);
  const _snackbar = inject(SnackbarService);
  const cmsName = route.paramMap.get('cms')!;
  console.log(cmsName);
  return _cmsService.getCms(cmsName).pipe(
    catchError((error:HttpErrorResponse)=>{
      _snackbar.error(error.error.message);
      return throwError(()=>error);
    })
  );
};


