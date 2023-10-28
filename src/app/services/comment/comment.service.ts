import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message/message.service';
import { Comment } from '../../models/comments';

import { Post } from '../../models/posts';
import { PostService } from '../post/post.service';


@Injectable({
  providedIn: 'root'
})


export class CommentService {
  posts: Post[] = [];
  APIkey = '';
  postId: any = '';
  panelOpenState = false;
  public url = 'https://gorest.co.in/public/v2/posts'
  public urlComment = 'https://gorest.co.in/public/v2/comments'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Comments from the server */
  getComments(): Observable<Comment[]> {
    const url = `${this.url}/${this.postId}/comments?access-token=${this.APIkey}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(_ => this.log('fetched comments')),
        catchError(this.handleError<Comment[]>('getComments', []))
      );
  }

  getAllComments(): Observable<Comment[]> {
    const url = `${this.urlComment}?access-token=${this.APIkey}`;
    return this.http.get<Comment[]>(url)
      .pipe(
        tap(_ => this.log('fetched comments')),
        catchError(this.handleError<Comment[]>('getComments', []))
      );
  }




  /** POST: add a new comment to the server */
  addComments(email: string, name: string, body: string) {
    const addCommentUrl = `${this.url}/${this.postId}/comments?access-token=${this.APIkey}`;
    return this.http.post<Comment>(addCommentUrl, {
      email: email,
      name: name,
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
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a UserService message with the MessageService */
  log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
