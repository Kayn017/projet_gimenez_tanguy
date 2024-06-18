import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type LoginResponse = { token: string; }
export type LoggedInUser = { username: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(environment.apiURL + '/login', { username, password });;
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<LoginResponse>(environment.apiURL + '/register', { username, password });
  }

  getConnectedUser(): Observable<LoggedInUser> {
    return this.httpClient.get<LoggedInUser>(environment.apiURL + '/me');
  }
}
