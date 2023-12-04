import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loading$ = false;

  constructor( private _loginSrv: LoginService,  private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
    // if (this._loginSrv.isAuthenticated()){
    //   this._router.navigate(['home'])
    // }
    document.querySelector("#enterEvnt")?.addEventListener("keyup", event => {
      const ev = event as any;

      if(ev.key !== "Enter") return; // Use `.key` instead.
      (document.querySelector("#loginBtn") as HTMLButtonElement)?.click(); // Things you want to do.
      ev.preventDefault(); // No need to `return false;`.
  });
  }

  authenticate(email : string, password : string){
    if (!this._loginSrv.isAuthenticated()){
      this._loginSrv.authenticate(email, password).pipe(
        map((data: any) => {

          console.log("Storage: ",this._loginSrv.retrieveData())
          if (data){
            this.loading$ = true;
            this._router.navigate(['dashboard'])
          }
          else{
            this.openSnackBar("Email ou Senha invalidos", "OK")

          }
        }
      )).subscribe()
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
