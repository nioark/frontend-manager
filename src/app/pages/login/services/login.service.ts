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
        this._router.navigate(['/login'])

        if (data.data != null){
          return true;
        }
        return false;
      }),
    );
  }

  isAuthenticated(): boolean{
    console.log("Value Bool: ", this.retrieveData() != null)

    console.log("Value: ", this.retrieveData())
    if (this.retrieveData().access_token != null){
      return true
    }
    return false
  }

  getName(): string{
    console.log("Storage: ",this.retrieveData())
    return this.retrieveData().name
  }

  logout(){
    localStorage.removeItem("userdata");
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
