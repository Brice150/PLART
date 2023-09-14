import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Message } from '../interfaces/message';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.apiServerUrl}/admin/user/all`, {
      withCredentials: true,
    });
  }

  public getAllMessages(): Observable<Message[]> {
    return this.http.get<any>(`${this.apiServerUrl}/admin/message/all`, {
      withCredentials: true,
    });
  }

  public deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/admin/user/${email}`, {
      withCredentials: true,
    });
  }

  public deleteMessage(messageId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/admin/message/${messageId}`,
      { withCredentials: true }
    );
  }

  public deleteObject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/admin/object/${id}`, {
      withCredentials: true,
    });
  }
}
