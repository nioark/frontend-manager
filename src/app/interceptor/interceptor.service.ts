import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { LoginService } from '../pages/login/services/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


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
      this._router.navigate([environment.url + '/login'])
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.error.error == "falha na autenticação") {
          this._loginSrv.logout()
          this._router.navigate([environment.url + '/login'])
        }
      }
    }));

 }

}
