import { Injectable } from '@angular/core';
import { Observable, catchError, ignoreElements, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CargosService } from '../../usuarios/services/cargos.service';
import { Cargo } from 'src/app/models/cargos';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string
  private userData:any;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public _router: Router) {
    this.url=environment.backend
    console.log("URL: ", this.url, window.location.host)
  }

  authenticate(email : string, password : string): Observable<boolean>{
    // const token = Md5.hashStr(name + password)

    const params = new HttpParams()
    .append('email', email)
    .append('password', password)

    return this.http.post(`${this.url}/usuarios/login`, "", {params: params}).pipe(
      catchError((err) => {
        console.error(err);
        return of(false);
      }),
      map((data: any) => {
        // Logado com sucesso
        if (data.data != null){
          this.storeToken(data.data)
          return true;
        }
        return false;
      }),
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  changePassword(newPassword: string): Observable<boolean>{
    const params = new HttpParams()
    .append('password', newPassword)
    return this.http.post(`${this.url}/usuarios/change-password`, "", {params: params}).pipe(
      catchError((err) => {
        console.error(err);
        this.openSnackBar(err.message as string, "OK")
        return of(false);
      }),
      map((data: any) => {
        // Logado com sucesso
        this.openSnackBar(data.message as string, "OK")
        this.logout()
        this._router.navigate([environment.url + '/login'])

        if (data.data != null){
          return true;
        }
        return false;
      }),
    );
  }

  changeUsername(username: string): Observable<boolean>{
    const params = new HttpParams()
    .append('username', username)
    return this.http.post(`${this.url}/usuarios/change-username`, "", {params: params}).pipe(
      catchError((err) => {
        console.error(err);
        this.openSnackBar(err.message as string, "OK")
        return of(false);
      }),
      map((data: any) => {
        // Logado com sucesso
        this.openSnackBar(data.message as string, "OK")


        let local = this.retrieveData()
        local.name = username

        localStorage.setItem("userdata", JSON.stringify(local));
        this._router.navigate([environment.url + '/dashboard'])

        if (data.data != null){
          return true;
        }
        return false;
      }),
    );
  }

  changeEmail(newEmail: string): Observable<boolean>{
    const params = new HttpParams()
    .append('email', newEmail)
    return this.http.post(`${this.url}/usuarios/change-email`, "", {params: params}).pipe(
      catchError((err) => {
        console.error(err);
        this.openSnackBar(err.message as string, "OK")
        return of(false);
      }),
      map((data: any) => {
        this.openSnackBar(data.message as string, "OK")
        this.logout()
        this._router.navigate([environment.url + '/login'])

        if (data.data != null){
          return true;
        }
        return false;
      }),
    );
  }

  isAuthenticated(): boolean{
    if (this.retrieveData().access_token != null){
      return true
    }
    return false
  }

  getName(): string{
    return this.retrieveData().name
  }

  logout(){
    localStorage.removeItem("userdata");
    localStorage.removeItem("permission_level");
  }

  storeToken(token: string) {
    localStorage.setItem("userdata", JSON.stringify(token));
  }

  retrieveData() : any {
    let storedToken = localStorage.getItem("userdata");
    if(!storedToken) return {data: {acces_token: null, name: ''}};
    return JSON.parse(storedToken);
  }

  //Add function to get cargo from user

}
