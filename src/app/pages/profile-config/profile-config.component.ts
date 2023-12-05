import { ThemeService } from './services/theme.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent implements OnInit {
  name: string | undefined;
  @ViewChildren("confirmpassword") confirmPassword!: QueryList<ElementRef>;
  @ViewChildren("password") password!: QueryList<ElementRef>;


  constructor(private _loginSrv: LoginService, private _themeSrv: ThemeService) {
    this.name = this._loginSrv.getName()
  }

  ngOnInit() {
    // document.documentElement.style.setProperty('--primary-color', "blue");
  }



  inputChanged() {

  }

  resetPassword() {
    if (this.password.first.nativeElement.value == this.confirmPassword.first.nativeElement.value) {
      console.log("Reset password")
      this._loginSrv.changePassword(this.password.first.nativeElement.value).subscribe((data) => {
        console.log(data)
      })
    }
  }

  changeTheme(){
    this._themeSrv.nextTheme();
  }

}
