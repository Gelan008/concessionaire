import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/Car';
import { CarsService } from '../service/cars/cars.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-cars-detail',
  templateUrl: './cars-detail.component.html',
  styleUrls: ['./cars-detail.component.scss']
})
export class CarsDetailComponent implements OnInit {

  public action: string;
  public id: string;
  public car: Car;
  public method: number;
  public error: string;

  constructor(private router: Router, private route: ActivatedRoute, private carService: CarsService) {
    this.car = new Car();
  }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.action = this.route.snapshot.params.action;
    // 1 if is new or 2 if is for edit
    this.method = this.action == undefined ? 1 : 2;

    if (this.method == 2){
      this.carService.getCar(this.id).subscribe(car => {
        console.log(car);
        this.car = car;
      },error => {
        console.log(error);
        this.error = 'Error al obtener el registro';
      });

    }

  }

  cancel(){
    this.router.navigate(['dashboard/cars']);
  }

  create(form){

    if (form.valid){
      this.carService.postSave(this.car).subscribe(
        result=>{
          this.router.navigate(['dashboard/cars']);
        },
        error => {
          console.log(error);
          this.error = 'Error al crear el coche';
        }

      );
    }


  }

  edit(form){

    if (form.valid){
      this.carService.putUpdate(this.car).subscribe(
        result=>{
          this.router.navigate(['dashboard/cars']);
        },
        error => {
          console.log(error);
          this.error = 'Error al editar el coche';
        }

      );
    }

  }

}
