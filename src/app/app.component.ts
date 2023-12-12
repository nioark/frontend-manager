import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './pages/login/services/login.service';
import { ThemeService } from './pages/profile-config/services/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HT Manager';

  constructor(private _router: Router, private _loginSrv : LoginService, private _themeSrv : ThemeService) {
    _themeSrv.setTheme()

    if (this._loginSrv.isAuthenticated() == false){
      this._router.navigate([environment.url + '/login'])
    }
  }
}
