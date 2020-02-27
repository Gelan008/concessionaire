import { Component, OnInit } from '@angular/core';
import {Car} from '../models/Car';
import {CarsService} from '../service/cars/cars.service';
import {first, ignoreElements} from 'rxjs/operators';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  cars: Car[];
  data: object;

  pageActual: number;
  lastPage: number;
  range = [];

  /*
  carsSize: number;
  page: number;
  pageSize: number;
  total: number;
  */

  public error: string;



  constructor(private carService: CarsService, private router: Router) {}

  ngOnInit() {
    this.pageActual = 1;
    this.lastPage = 1;
    this.getCars(this.pageActual);
  }

  getCars(page: number){



    if (page <= this.lastPage && page > 0){
      this.pageActual = page;
      this.carService.getAll(page).subscribe(cars => {

        this.data = cars;
        console.log(this.data);

        this.cars = cars.data;
        var pages = [];

        for(var i = 1 ; i <= this.data['last_page'] ; i++) {
          pages.push(i);
        }

        this.range = pages;
        this.lastPage = this.data['last_page']

      },error => {
        console.log(error);
        this.error = 'Error al mostrar los coches';
      });
    }


  }

  createCar(){
    this.router.navigate(['dashboard/cars/car-detail']);
  }

  updateCar(id: number){
    this.router.navigate(['dashboard/cars/car-detail/edit/'+id])
  }

  deleteCar(id: number, index: number){

    Swal.fire({
      title: '¿Seguro que quieres eliminar el coche?',
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'rgb(142,142,142)',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {

        this.carService.delete(id).subscribe(
          result=>{
            Swal.fire(
              'Eliminado',
              'El coche '+ this.cars[index].title +' ha sido eliminado',
              'success'
            )

            this.cars.splice(index, 1);

            this.getCars(this.pageActual);

          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo fue mal, intentalo de nuevo mas tarde'
            })
            console.log(error);

          }

        );

      }

    })


  }


}
