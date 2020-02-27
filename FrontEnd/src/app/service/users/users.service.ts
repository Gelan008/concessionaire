import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Car} from '../../models/Car';
import {environment} from '../../../environments/environment';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(environment.apiUrl+'/users');
  }

  getUser(id){
    var data = {"id": id};
    console.log(data);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<User>(environment.apiUrl+'/user',data,{headers:hed});
  }

  postSave(user: User){
    var data = JSON.stringify(user);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(environment.apiUrl+'/user/create',data,{headers:hed});
  }

  putUpdate(user: User){
    var data = JSON.stringify(user);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.put(environment.apiUrl+'/user/update',data,{headers:hed});
  }

  delete(id){
    const options = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };

    return this.http.delete(environment.apiUrl+'/user/delete', options);
  }
}
