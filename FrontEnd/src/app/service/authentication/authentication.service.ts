import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from '../../models/User';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();

    //this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));

  }

  public get currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public get currentTokenValue(): string {
    return localStorage.getItem('currentToken');
  }

  public setCurrentUser(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http.post<any>(environment.apiUrl+'/login', { email, password })
      .pipe(map(user => {
        // Store the user and the token for keep the sesion when refresh the page
        localStorage.setItem('currentUser', JSON.stringify(user['user']));
        localStorage.setItem('currentToken', user['token']/*'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9qd3QuZXM6ODg4OFwvbG9naW4iLCJpYXQiOjE1ODIwMjQ4MzcsImV4cCI6MTU4MjAyODQzNywibmJmIjoxNTgyMDI0ODM3LCJqdGkiOiJMb2dHY1VheFlvSnA1OWRUIiwic3ViIjo1LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.Hl4sr8EBWaQYUJe73fGKrX8dA6diFjogb--kkhcCCfg'*/);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');

  }
}
