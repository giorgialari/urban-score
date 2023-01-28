import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    APIkey = '';
    signInURL = 'https://gorest.co.in/public/v2/users?access-token=';
  
    isLoggedIn = false; 

    constructor(private http: HttpClient) { }
  
    isAuthenticated(){
        return this.isLoggedIn 
    }
   
    signIn(accesstoken: string){
      const signInUrl = this.signInURL + this.APIkey;
      return this.http.get(signInUrl, {responseType: 'json',  observe: 'response' }); 
  }
  
  logout() {
    this.isLoggedIn = false;
  }
}

