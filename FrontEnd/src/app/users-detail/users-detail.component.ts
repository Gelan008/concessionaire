import { Component, OnInit } from '@angular/core';
import {Car} from '../models/Car';
import {User} from '../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../service/users/users.service';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication/authentication.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  public action: string;
  public id: string;
  public user: User;
  public method: number;
  private currentUser: User;
  public error: string;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UsersService, private authenticationService: AuthenticationService) {
    this.user = new User();
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.id = this.route.snapshot.params.id;
    this.action = this.route.snapshot.params.action;
    // 1 if is new or 2 if is for edit
    this.method = this.action == undefined ? 1 : 2;

    if (this.method == 2){
      this.userService.getUser(this.id).subscribe(user => {
        console.log(user);
        this.user = user;
      },error => {
        console.log(error);
        this.error = 'Error al obtener el usuario';
      });

    }

  }

  cancel(){
    this.router.navigate(['dashboard/users']);
  }

  create(form){

    if (form.valid){
      this.userService.postSave(this.user).subscribe(
        result=>{
          this.router.navigate(['dashboard/users']);
        },
        error => {
          console.log(error);
          this.error = 'Error al crear al usuario';
        }

      );
    }


  }

  edit(form){

    if (form.valid){
      this.userService.putUpdate(this.user).subscribe(
        result=>{
          if (this.user.id == this.currentUser.id){
            this.currentUser.name = this.user.name;
            this.authenticationService.setCurrentUser(this.currentUser);
          }

          this.router.navigate(['dashboard/users']);
        },
        error => {
          console.log(error);
          this.error = 'Error al editar al usuario';
        }

      );
    }


  }


}
