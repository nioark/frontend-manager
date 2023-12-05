import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _loginSrv: LoginService, private _router: Router) { }

  ngOnInit() {

    if (this._loginSrv.isAuthenticated()){
      this._router.navigate(['home'])
    }
  }

}
