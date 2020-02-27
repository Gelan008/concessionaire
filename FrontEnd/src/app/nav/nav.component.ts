import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {User} from '../models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  ngDoCheck(){
    this.currentUser = this.authenticationService.currentUserValue;
  }



  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
