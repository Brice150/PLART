import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StatsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getUsersNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/stats/users`, {
      withCredentials: true,
    });
  }

  public getCreatorsNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/stats/creators`, {
      withCredentials: true,
    });
  }

  public getObjectsNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/stats/objects`, {
      withCredentials: true,
    });
  }
}
