import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {first} from 'rxjs/operators';
import {User} from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username:string;
  public password:string;
  public User: User;
  public error: string;


  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }

  }

  /*login(){
    this.User = {email:this.username, password:this.password};
    this.auth.login(this.User);
    //this.router.navigate(['/dashboard']);

  }*/

  login2(userInput, passInput){

    if (userInput.valid && passInput.valid){
      this.authenticationService.login(this.username, this.password)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(['/dashboard']);
          },
          error => {
            console.log(error);
            this.error = 'Error al iniciar sesión';
          });
    }





  }


}
