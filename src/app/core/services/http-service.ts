import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly _http = inject(HttpClient);

  public getRequest(endpoint: string, auth : boolean = true, params?: Params) {
    return this._http
      .get(endpoint, {
        headers: {
          noauth: String(auth), // Ad noauth header to bypass custom api prefix interceptor
        },
      });
  }

   public postRequest(endpoint: string, auth : boolean = true, params?: Params) {
    return this._http
      .post(endpoint, {
        headers: {
          noauth: String(auth), // Ad noauth header to bypass custom api prefix interceptor
        },
      })
      .pipe(map((response: any) => response.results));
  }
}
