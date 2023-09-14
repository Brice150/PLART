import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public register(user: User): any {
    return this.http.post(`${this.apiServerUrl}/registration`, user, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  public login(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + window.btoa(user.email + ':' + user.password),
    });
    return this.http.get<User>(`${this.apiServerUrl}/login`, {
      withCredentials: true,
      headers,
    });
  }
}
