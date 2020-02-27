import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CarsComponent } from '../cars/cars.component';
import {DashRoutingModule} from './dash-routing.module';
import {UsersComponent} from '../users/users.component';
import {CarsDetailComponent} from '../cars-detail/cars-detail.component';
import {FormsModule} from '@angular/forms';
import {UsersDetailComponent} from '../users-detail/users-detail.component';
import {JwPaginationComponent} from 'jw-angular-pagination';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from '../service/jwt.interceptor';
import {ErrorInterceptor} from '../service/error.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
    CarsComponent,
    UsersComponent,
    CarsDetailComponent,
    JwPaginationComponent
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },]
})
export class DashModule { }
