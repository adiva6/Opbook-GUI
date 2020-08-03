import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class HttpHandler {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private createDefaultHeaders(hasContent: boolean = false): HttpHeaders {
    if (this.authService.hasAuthorization()) {
      let headers = new HttpHeaders()
        .set('Authorization', this.authService.getAuthToken())
        .set('Cache-Control', 'no-cache');

      if (hasContent) {
          headers = headers.set('Content-Type', 'application/json');
      }

      return headers;
    }
    return new HttpHeaders();
  }

  private setHeaders(options: { headers?: HttpHeaders }, hasContent: boolean = false): void {
    if (options.headers == null) {
      options.headers = this.createDefaultHeaders(hasContent);
    }
  }

  public get(host: string, resource: string, options: { headers?: HttpHeaders, params?: HttpParams }
    = { headers: this.createDefaultHeaders() }): Observable<any> {
    this.setHeaders(options);
    const address: string = host + '/' + resource;
    return this.http.get(address, options);
  }

  public post(host: string, resource: string, body: any, options: { headers?: HttpHeaders, params?: HttpParams }
    = { headers: this.createDefaultHeaders(!isNullOrUndefined(body)) }): Observable<any> {
    this.setHeaders(options, !isNullOrUndefined(body));
    const address: string = host + '/' + resource;
    return this.http.post(address, body, options);
  }

  public put(host: string, resource: string, body: any,
             options: { headers?: HttpHeaders, params?: HttpParams } = { headers: this.createDefaultHeaders(!isNullOrUndefined(body)) }
  ): Observable<any> {
    this.setHeaders(options, !isNullOrUndefined(body));
    const address: string = host + '/' + resource;
    return this.http.put(address, body, options);
  }

  public delete(host: string, resource: string, options: { headers?: HttpHeaders, params?: HttpParams }
    = { headers: this.createDefaultHeaders() }): Observable<any> {
    this.setHeaders(options);
    const address: string = host + '/' + resource;
    return this.http.delete(address, options);
  }
}
