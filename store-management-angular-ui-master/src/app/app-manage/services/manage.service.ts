import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  private apiEndPoint: string = environment.API_URL + 'entities';
  constructor(private http: HttpClient) { }

  getEntities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEndPoint)
      .pipe(catchError(this.handleErrorObservable));
  }

  getEntityViews(entityId: string): Observable<any> {
    const endpoint = `${this.apiEndPoint}/${entityId}/entity-views`;
    return this.http.get<any>(endpoint)
      .pipe(catchError(this.handleErrorObservable));
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
