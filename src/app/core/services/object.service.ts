import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Object } from '../interfaces/object';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class ObjectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllObjects(): Observable<Object[]> {
    return this.http.get<any>(`${this.apiServerUrl}/object/all`, {
      withCredentials: true,
    });
  }

  public getObjectCreator(objectId: number): Observable<User> {
    return this.http.get<any>(
      `${this.apiServerUrl}/object/creator/${objectId}`,
      { withCredentials: true }
    );
  }

  addObject(
    object: Object,
    filesData: FormData,
    picturesData: FormData
  ): Observable<Object> {
    const formData = new FormData();
    formData.append('object', JSON.stringify(object));

    const headers = new HttpHeaders().append('Accept', 'application/json');
    headers.append(
      'Content-Type',
      'multipart/form-data; boundary=--------------------------1234567890'
    );

    formData.append('files', filesData.get('files')!);
    formData.append('pictures', picturesData.get('pictures')!);

    return this.http.post<Object>(`${this.apiServerUrl}/object`, formData, {
      headers,
      withCredentials: true,
    });
  }

  public updateObject(object: Object): Observable<Object> {
    return this.http.put<Object>(`${this.apiServerUrl}/object`, object, {
      withCredentials: true,
    });
  }

  public deleteObject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/object/${id}`, {
      withCredentials: true,
    });
  }

  public getPicture(pictureName: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.apiServerUrl}/object/picture/${pictureName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
      withCredentials: true,
    });
  }

  public getFile(fileName: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.apiServerUrl}/object/file/${fileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
      withCredentials: true,
    });
  }
}
