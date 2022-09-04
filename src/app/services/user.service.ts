import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this.http.get<any>(`${this.apiServerUrl}/admin/user/all`,
        { withCredentials: true });
    }

    public findUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/user/find/email/${email}`,
        { withCredentials: true });
    }
    
    public findUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/user/find/id/${id}`,
        { withCredentials: true });
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/user/update`, user,
        { withCredentials: true });
    }

    public deleteUser(email: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${email}`,
        { withCredentials: true });
    }

}