import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loading$ = false;

  constructor( private _loginSrv: LoginService,  private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
    document.querySelector("#enterEvnt")?.addEventListener("keyup", event => {
      const ev = event as any;

      if(ev.key !== "Enter") return;
      (document.querySelector("#loginBtn") as HTMLButtonElement)?.click();
      ev.preventDefault();
  });
  }

  authenticate(email : string, password : string){
    this.loading$ = true;

    if (!this._loginSrv.isAuthenticated()){
      this._loginSrv.authenticate(email, password).pipe(
        map((data: any) => {
          if (data){
            this._router.navigate([environment.url + '/dashboard'])
          }
          else{
            this.openSnackBar("Email ou Senha invalidos", "OK")
            this.loading$ = false;
          }
        }
      )).subscribe()
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
