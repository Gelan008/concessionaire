import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {UsersService} from '../service/users/users.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {AuthenticationService} from '../service/authentication/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  currentUser: User;
  public error: string;

  constructor(private userService: UsersService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userService.getAll().subscribe(users => {
      console.log(users);
      this.users = users;
    },error => {
      console.log(error);
      this.error = 'Error al mostrar a los usuarios';
    });
  }


  createUser(){
    this.router.navigate(['dashboard/users/user-detail']);
  }

  updateUser(id: number){
    this.router.navigate(['dashboard/users/user-detail/edit/'+id])
  }

  deleteUser(id: number, index: number){

    Swal.fire({
      title: '¿Seguro que quieres eliminar al usuario?',
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'rgb(142,142,142)',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {

        this.userService.delete(id).subscribe(
          result=>{
            Swal.fire(
              'Eliminado',
              'El usuario '+this.users[index].name+' ha sido eliminado',
              'success'
            )

            this.users.splice(index, 1);

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
