import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/services/login.service';
import { Router } from '@angular/router';


@Injectable()
export class InterceptorService implements HttpInterceptor {

//  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  constructor(private _loginSrv: LoginService, public _router: Router) { }

 intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if (this._loginSrv.isAuthenticated() == true){
      request = request.clone({
        params: request.params.set(
            "access_token",
            this._loginSrv.retrieveData().access_token
        ),
      })
    }
    else {
      this._router.navigate(['/login'])
    }

    return next.handle(request);

 }

}
