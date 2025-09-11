import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../core/services/http-service';
import { BaseService } from '../../../core/services/base-service';
import { API } from '../../../../environments/APIs/API';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmsService extends BaseService {
  private readonly _httpService = inject(HttpService);

  getCms(cms: string) {
    return this._httpService
      .getRequest(this._apiBaseUrl + this._endpoints.GET_CMS_PAGE, false, {
        cmsName: cms,
      })
      .pipe(
        map((res: any) => {
          return {
            name: res.data.name,
            cms: res.data.cms,
          };
        })
      );
  }
}
