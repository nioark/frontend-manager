import { Injectable } from '@angular/core';
import { Observable, catchError, ignoreElements, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string
  private userData:any;
  constructor(private http: HttpClient) {
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
}
