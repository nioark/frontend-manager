import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from './interceptor.service';
import { LoginService } from '../pages/login/services/login.service';

@NgModule({
  providers: [
    InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
      deps: [LoginService]
    },
  ],
})
export class InterceptorModule {}
