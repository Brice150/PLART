import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/message';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUserMessages(fkUser: number): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.apiServerUrl}/message/all/${fkUser}`,
      { withCredentials: true }
    );
  }

  public getMessageSender(messageId: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiServerUrl}/message/sender/${messageId}`,
      { withCredentials: true }
    );
  }

  public getUserMessagesNumber(fkUser: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiServerUrl}/message/all/number/${fkUser}`,
      { withCredentials: true }
    );
  }

  public addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiServerUrl}/message`, message, {
      withCredentials: true,
    });
  }

  public updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.apiServerUrl}/message`, message, {
      withCredentials: true,
    });
  }

  public deleteMessage(messageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/message/${messageId}`, {
      withCredentials: true,
    });
  }
}
