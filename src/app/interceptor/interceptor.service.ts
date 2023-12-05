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
    // const loginService = this._loginSrv.retrieveData()
    //console.log("Storage: ",this._loginSrv.retrieveData())


    console.log("Is logged: ",this._loginSrv.isAuthenticated() )
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

    // const headers = request.headers.set('Authorization', this._loginSrv.retrieveData().acess_tokens);
    // request = request.clone({ headers })
    // request.params.append('Authorization', this._loginSrv.retrieveData().acess_tokens)
    // const cloneReq = request.clone({
    //   params: request.params.set(
    //       "Authorization",
    //       this._loginSrv.retrieveData().acess_tokens["access_token"]
    //   ),
    // })

    console.log("Request: ", request)

    return next.handle(request);

 }

}
