import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../../core/services/loader-service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _loader = inject(LoaderService);

  _loader.show();
  return next(req).pipe(
    finalize(()=>{
      _loader.hide()
    })
  );
};
