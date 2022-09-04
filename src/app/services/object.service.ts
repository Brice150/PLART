import { HttpClient, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Object } from '../models/object';

@Injectable({providedIn: 'root'})
export class ObjectService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getObjects(): Observable<Object[]> {
        return this.http.get<any>(`${this.apiServerUrl}/object/all`,
        { withCredentials: true });
    }

    public findObject(id: number): Observable<Object> {
        return this.http.get<Object>(`${this.apiServerUrl}/object/find/${id}`,
        { withCredentials: true });
    }

    public addObject(object: Object): Observable<Object> {
        return this.http.post<Object>(`${this.apiServerUrl}/object/add`, object,
        { withCredentials: true });
    }

    public updateObject(object: Object): Observable<Object> {
        return this.http.put<Object>(`${this.apiServerUrl}/object/update`, object,
        { withCredentials: true });
    }

    public deleteObject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/object/delete/${id}`,
        { withCredentials: true });
    }

    public uploadWork(formData: FormData): Observable<HttpEvent<string[]>> {
        return this.http.post<string[]>(`${this.apiServerUrl}/work/file/upload`, formData, {
            reportProgress: true,
            observe: 'events',
            withCredentials: true
        })
    }

    public downloadWork(filename: string): Observable<HttpEvent<Blob>> {
        return this.http.get(`${this.apiServerUrl}/work/file/download/${filename}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob',
            withCredentials: true
        })
    }

    public deleteFile(filename: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/work/file/delete/${filename}`,
        { withCredentials: true });
    }

}