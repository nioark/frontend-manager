import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './pages/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HT Manager';

  constructor(private _router: Router, private _loginSrv : LoginService) {
    if (this._loginSrv.isAuthenticated() == false){
      this._router.navigate(['/login'])
    }
  }
}
