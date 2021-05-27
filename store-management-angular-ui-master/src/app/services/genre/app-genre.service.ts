import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Genre } from 'src/app/interfaces/Genre';

@Injectable({
  providedIn: 'root'
})
export class AppGenreService {
  private apiEndPoint: string = environment.API_URL + 'api/genre';

  constructor(private http: HttpClient) { }

  getGenre(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiEndPoint)
      .pipe(catchError(this.handleErrorObservable));
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
