import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class AdminService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this.http.get<any>(`${this.apiServerUrl}/admin/user/all`,
        { withCredentials: true });
    }

    public deleteUser(email: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/admin/user/delete/${email}`,
        { withCredentials: true });
    }

    public getMessages(): Observable<Message[]> {
        return this.http.get<any>(`${this.apiServerUrl}/admin/message/all`,
        { withCredentials: true });
    }

    public deleteMessage(messageId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/admin/message/delete/${messageId}`,
        { withCredentials: true });
    }

    public deleteObject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/admin/object/delete/${id}`,
        { withCredentials: true });
    }

}