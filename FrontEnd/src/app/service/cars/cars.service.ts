import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Car} from '../../models/Car';
import {environment} from '../../../environments/environment';
import Swal from 'sweetalert2';
import {CarPag} from '../../models/CarPag';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAll(page:number) {
    return this.http.get<CarPag<Car>>(environment.apiUrl + '/cars?page='+page);
  }

  getCar(id){
    var data = {"id": id};
    console.log(data);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<Car>(environment.apiUrl+'/car',data,{headers:hed});
  }

  postSave(car: Car){
    var data = JSON.stringify(car);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(environment.apiUrl+'/car/create',data,{headers:hed});
  }

  putUpdate(car: Car){
    var data = JSON.stringify(car);
    var hed = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.put(environment.apiUrl+'/car/update',data,{headers:hed});
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

    return this.http.delete(environment.apiUrl+'/car/delete', options);
  }
}
