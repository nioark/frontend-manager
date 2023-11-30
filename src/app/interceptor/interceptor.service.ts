import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../pages/login/services/login.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

//  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  constructor(public _loginSrv: LoginService) { }

 intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // const loginService = this._loginSrv.retrieveData()

    request = request.clone({
      setHeaders: {
        Authorization: this._loginSrv.retrieveData().Token
      }
    });

    console.log("Request interceptada: ", request);


    return next.handle(request);

 }

}
