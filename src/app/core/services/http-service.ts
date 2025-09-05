import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { map } from 'rxjs';
import { isAccessor } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _http = inject(HttpClient);

  public getRequest(endpoint: string, auth: boolean = true, params?: Params) {
    return this._http.get(endpoint, {
      headers: {
        noauth: String(auth), // Ad noauth header to bypass custom api prefix interceptor
      },
      params: params ?? {}
    });
  }

  public postRequest(endpoint: string, params?: Params) {
    return this._http.post(endpoint, params ?? {}, {
      headers: { Accept: 'application/json' },
      // withCredentials: true,
    });
  }
}
