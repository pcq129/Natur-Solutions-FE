import { Injectable, inject } from '@angular/core';
import { HttpService } from './http-service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
    readonly _http = inject(HttpService);
    readonly _apiBaseUrl = environment.apiUrl;
    readonly _csrfUrl = environment.csrfUrl;
}
