import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {User} from '../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
