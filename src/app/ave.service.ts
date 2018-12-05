import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ave } from './ave';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AveService {
  private avesUrl = 'api/aves';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  /** GET aves from the server */
  getAves(): Observable<Ave[]> {
    return this.http.get<Ave[]>(this.avesUrl)
      .pipe(
        tap(_ => this.log('fetched aves')),
        catchError(this.handleError('getAves', []))
      );
  }
  /** GET ave by id. Return `undefined` when id not found */
  getAveNo404<Data>(id: number): Observable<Ave> {
    const url = `${this.avesUrl}/?id=${id}`;
    return this.http.get<Ave[]>(url)
      .pipe(
        map(aves => aves[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} ave id=${id}`);
        }),
        catchError(this.handleError<Ave>(`getAve id=${id}`))
      );
  }
  /** GET ave by id. Will 404 if id not found */
  getAve(id: number): Observable<Ave> {
    const url = `${this.avesUrl}/${id}`;
    return this.http.get<Ave>(url).pipe(
      tap(_ => this.log(`fetched ave id=${id}`)),
      catchError(this.handleError<Ave>(`getAve id=${id}`))
    );
  }

  /* GET aves whose name contains search term */
  searchAves(term: string): Observable<Ave[]> {
    if (!term.trim()) {
      // if not search term, return empty ave array.
      return of([]);
    }
    return this.http.get<Ave[]>(`${this.avesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found aves matching "${term}"`)),
      catchError(this.handleError<Ave[]>('searchAves', []))
    );
  }
   //////// Save methods //////////

  /** POST: add a new ave to the server */
  addAve (ave: Ave): Observable<Ave> {
    return this.http.post<Ave>(this.avesUrl, ave, httpOptions).pipe(
    tap((ave: Ave) => this.log(`added ave w/ id=${ave.id}`)),
    catchError(this.handleError<Ave>('addAve'))
  );
  }

  /** DELETE: delete the ave from the server */
  deleteAve (ave: Ave | number): Observable<Ave> {
  const id = typeof ave === 'number' ? ave : ave.id;
  const url = `${this.avesUrl}/${id}`;

  return this.http.delete<Ave>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted ave id=${id}`)),
    catchError(this.handleError<Ave>('deleteAve'))
  );
}
  /** PUT: update the ave on the server */
  updateAve (ave: Ave): Observable<any> {
    return this.http.put(this.avesUrl, ave, httpOptions).pipe(
      tap(_ => this.log(`updated ave id=${ave.id}`)),
      catchError(this.handleError<any>('updateAve'))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a AveService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AveService: ${message}`);
    }
}
