import { ResolveFn } from '@angular/router';
import { ICms } from '../interfaces';
import { inject } from '@angular/core';
import { CmsService } from '../services/cms-service';
import { catchError, map, of } from 'rxjs';

export const cmsResolverResolver: ResolveFn<ICms> = (route, state) => {
  console.log('In resolver');
  const _cmsService = inject(CmsService);
  const cmsName = route.paramMap.get('cms')!;
  console.log(cmsName);
  return _cmsService.getCms(cmsName);
};


