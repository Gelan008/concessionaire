import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationService} from './authentication/authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    let currentToken = this.authenticationService.currentTokenValue;

    if (currentUser && currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentToken
        }
      });
    }



    return next.handle(request);
  }
}
