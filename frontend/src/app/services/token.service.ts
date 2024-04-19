import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null = null;

  constructor() { }

  public setToken(token: string | null) {
    this.token = token;
  }

  public setTokenOnRequest<T>(req: HttpRequest<T>): HttpRequest<T> {
    if(!this.token) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
