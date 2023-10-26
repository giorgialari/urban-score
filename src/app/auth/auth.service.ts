import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  APIkey = '';
  signInURL = 'https://gorest.co.in/public/v2/users?access-token=';

  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }


  isAuthenticated() {
    const token = localStorage.getItem('token');
    return this.isLoggedIn || !!token;
  }

  signIn() {
    const signInUrl = this.signInURL + this.APIkey;
    this.isLoggedIn = true;
    return this.http.get(signInUrl, { responseType: 'json', observe: 'response' });
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}

