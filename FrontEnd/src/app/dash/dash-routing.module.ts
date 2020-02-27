import {RouterModule, Routes} from '@angular/router';
import {NavComponent} from '../nav/nav.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {CarsComponent} from '../cars/cars.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../service/auth.guard';
import {NotFoundComponent} from '../not-found/not-found.component';
import {UsersComponent} from '../users/users.component';
import {CarsDetailComponent} from '../cars-detail/cars-detail.component';
import {UsersDetailComponent} from '../users-detail/users-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CarsComponent
      },
      {
        path: 'cars',
        component: CarsComponent
      },
      {
        path: 'cars/car-detail',
        component: CarsDetailComponent
      },
      {
        path: 'cars/car-detail/:action/:id',
        component: CarsDetailComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/user-detail',
        component: UsersDetailComponent
      },
      {
        path: 'users/user-detail/:action/:id',
        component: UsersDetailComponent
      },

    ]
  },
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
