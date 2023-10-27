import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Post } from './posts';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  APIkey = '';
  userid: any = '';
  nPost: any = 10;
  nPage: any = 1;

  public PostUrl = 'https://gorest.co.in/public/v2/users'
  private AllPostUrl = 'https://gorest.co.in/public/v2/posts'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Posts of user from the server */
  getPosts(): Observable<Post[]> {
    const url = `${this.PostUrl}/${this.userid}/posts?access-token=${this.APIkey}`;
    return this.http.get<Post[]>(url)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }
  /** GET All Posts from the server */
  getAllPosts(): Observable<Post[]> {
    const url = `${this.AllPostUrl}?per_page=${this.nPost}&page=${this.nPage}&access-token=${this.APIkey}`;
    return this.http.get<Post[]>(url)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getAllPosts', []))
      );
  }
  // addPosts(title: string, body: string) {
  //   const addCommentUrl = `${this.PostUrl}/${this.userid}/posts?access-token=${this.APIkey}`;
  //   return this.http.post<Post>(addCommentUrl, {
  //     title: title,
  //     body: body,
  //     returnSecureToken: true
  //   });
  // }

  addPost(user: string, user_id: number, title: string, body: string): Observable<Post> {
    const addPostUrl = `${this.AllPostUrl}?access-token=${this.APIkey}`;
    return this.http.post<Post>(addPostUrl, {
      user: user,
      user_id: user_id,
      title: title,
      body: body,
      returnSecureToken: true
    });
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
