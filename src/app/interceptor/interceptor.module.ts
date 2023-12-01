import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from './interceptor.service';
import { LoginService } from '../pages/login/services/login.service';
import { Router } from '@angular/router';

@NgModule({
  providers: [
    InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
      deps: [LoginService, Router]
    },
  ],
})
export class InterceptorModule {}
