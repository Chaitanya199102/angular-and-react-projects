import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Publisher } from 'src/app/interfaces/Publisher';

@Injectable({
  providedIn: 'root'
})
export class AppPublisherService {

  private apiEndPoint: string = environment.API_URL + 'api/publishers';

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiEndPoint)
      .pipe(catchError(this.handleErrorObservable));
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
