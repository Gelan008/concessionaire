import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarsComponent } from './cars/cars.component';
import { UsersComponent } from './users/users.component';
import {ErrorInterceptor} from './service/error.interceptor';
import {JwtInterceptor} from './service/jwt.interceptor';
import {DashModule} from './dash/dash.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { CarsDetailComponent } from './cars-detail/cars-detail.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import {JwPaginationComponent} from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    UsersDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DashModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
