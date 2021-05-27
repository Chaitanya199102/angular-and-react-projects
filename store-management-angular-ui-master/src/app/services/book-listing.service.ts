import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookListingService {

  private apiEndPoint: string = environment.API_URL + 'api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiEndPoint)
      .pipe(catchError(this.handleErrorObservable));
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
