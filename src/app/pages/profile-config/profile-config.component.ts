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
  @ViewChildren("username") username!: QueryList<ElementRef>;

  canSubmitName$ = false;
  canSubmitPassword$ = false;


  constructor(private _loginSrv: LoginService) {
    this.name = this._loginSrv.getName()
  }

  ngOnInit() {
    // document.documentElement.style.setProperty('--primary-color', "blue");
  }



  inputChangedPassword() {
    setTimeout(() => {
      let flag = true;

      if (this.password.first.nativeElement.value == this.confirmPassword.first.nativeElement.value)
        this.canSubmitPassword$ = true;
      else
        this.canSubmitPassword$ = false;

    }, 100);
  }

  inputChangedName() {
    setTimeout(() => {
      let flag = true;

      if (this.username.first.nativeElement.value != "")
        this.canSubmitName$ = true;
      else
        this.canSubmitName$ = false;

    }, 100);
  }

  resetPassword() {
    if (this.password.first.nativeElement.value == this.confirmPassword.first.nativeElement.value) {
      this._loginSrv.changePassword(this.password.first.nativeElement.value).subscribe()
    }
  }

  changeUsername(){
    if (this.username.first.nativeElement.value != ""){

      this._loginSrv.changeUsername(this.username.first.nativeElement.value).subscribe()
    }
  }


}
