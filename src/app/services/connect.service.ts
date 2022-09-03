import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class ConnectService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public register(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/register`, user);
    }

    public login(user: User){
        const headers = new HttpHeaders({ Authorization: 'Basic ' 
        + window.btoa(user.email + ":" + user.password)});
        console.log(headers);
        return this.http.get(`${this.apiServerUrl}/login`, {headers, responseType: 'text'});
    }
}