import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { ThemeService } from '../profile-config/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _loginSrv: LoginService, private _themeSrv : ThemeService, private _router: Router) { }

  ngOnInit() {
    this._themeSrv.setThemeIndex(0)

    if (this._loginSrv.isAuthenticated()){
      this._router.navigate(['home'])
    }
  }

}
