import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }


  login(user:User){
    let json = JSON.stringify(user);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    this.http.post('http://jwt.es:8888/login',json,{headers:hed}).subscribe(
      result=>{
        //let user = <User>result['user'];
        let user = JSON.stringify(result['user']);
        let token = result['token'];
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);


      },
      error => {
         console.log(error);


      }

    );

  }

  getUser():User{
    let user = <User>JSON.parse(localStorage.getItem('user'));
    return user;
  }

  getToken():string{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.setItem('user','');
    localStorage.setItem('token','');
  }


}
