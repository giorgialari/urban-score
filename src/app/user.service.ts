import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './users';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  APIkey = '';
  nUsers: any = '10';
  nPage: any = 1;
  private url = 'https://gorest.co.in/public/v2/users'// URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** GET Users from the server */
  getUsers(): Observable<User[]> {
    const url = `${this.url}?page=${this.nPage}&per_page=${this.nUsers}&access-token=${this.APIkey}`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }



  /** GET user by id(DETAIL). Will 404 if id not found */
  getUserById(id: number): Observable<User> {
    const url = `${this.url}/${id}?access-token=${this.APIkey}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }


  addUser(user: User): Observable<User> {
    const addUserUrl = `${this.url}?access-token=${this.APIkey}`;
    return this.http.post<User>(addUserUrl, user);
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    const url = `${this.url}/${id}/?access-token=${this.APIkey}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

}
