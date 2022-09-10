import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';

@Injectable({providedIn: 'root'})
export class MessageService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public addMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(`${this.apiServerUrl}/message/add`, message,
        { withCredentials: true });
    }

    public updateMessage(message: Message): Observable<Message> {
        return this.http.put<Message>(`${this.apiServerUrl}/message/update`, message,
        { withCredentials: true });
    }

    public deleteMessage(messageId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/message/delete/${messageId}`,
        { withCredentials: true });
    }

}