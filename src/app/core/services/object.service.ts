import { HttpClient, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Object } from '../interfaces/object';

@Injectable({providedIn: 'root'})
export class ObjectService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getObjects(): Observable<Object[]> {
        return this.http.get<any>(`${this.apiServerUrl}/object/all`,
        { withCredentials: true });
    }

    public findObject(id: number): Observable<Object> {
        return this.http.get<Object>(`${this.apiServerUrl}/object/${id}`,
        { withCredentials: true });
    }

    public addObject(object: Object): Observable<Object> {
        return this.http.post<Object>(`${this.apiServerUrl}/object`, object,
        { withCredentials: true });
    }

    public updateObject(object: Object): Observable<Object> {
        return this.http.put<Object>(`${this.apiServerUrl}/object`, object,
        { withCredentials: true });
    }

    public deleteObject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/object/${id}`,
        { withCredentials: true });
    }

    public uploadFile(formData: FormData): Observable<HttpEvent<string[]>> {
        return this.http.post<string[]>(`${this.apiServerUrl}/object/file`, formData, {
            reportProgress: true,
            observe: 'events',
            withCredentials: true
        })
    }

    public uploadImage(formData: FormData): Observable<HttpEvent<string[]>> {
        return this.http.post<string[]>(`${this.apiServerUrl}/object/image`, formData, {
            reportProgress: true,
            observe: 'events',
            withCredentials: true
        })
    }

    public getImage(imagename: string): Observable<HttpEvent<Blob>> {
        return this.http.get(`${this.apiServerUrl}/object/image/${imagename}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob',
            withCredentials: true
        })
    }

    public downloadObject(filename: string): Observable<HttpEvent<Blob>> {
        return this.http.get(`${this.apiServerUrl}/object/file/${filename}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob',
            withCredentials: true
        })
    }

}