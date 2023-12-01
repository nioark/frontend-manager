import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataResult } from 'src/app/models/data-result.model';
import { throwError } from 'rxjs';
import { ListenData } from 'src/app/models/listen-data.model';
import { Usuario, UsuarioEdit, UsuarioNew } from 'src/app/models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  list: ListenData<Usuario>|undefined

  url:string
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.url=environment.backend
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  fetch(): Observable<Usuario[]> {
    return this.http.get<DataResult<Usuario[]>>(`${this.url}/admin/usuarios`).pipe(
      map(data => data?.data?.length ? data.data : []),
      tap({
        next: data=> this.list = new ListenData<Usuario>(data)
      }),
      switchMap((data) => this.list  ? this.list?.data$ : of(data)),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  get(id: number): Observable<Usuario>{
    return this.http.get<DataResult<Usuario>>(`${this.url}/admin/usuarios/${id}`).pipe(
      map(data => data.data as Usuario),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  add_usuario(usuario: UsuarioNew): Observable<any> {
    const params = new HttpParams()
      .append('name', usuario.name)
      .append('email', usuario.email)
      .append('password', usuario.password)
      .append('cargo_id', usuario.cargo.id)

      console.log("Post: ", params, usuario)

    return this.http.post<DataResult<Usuario>>(`${this.url}/admin/usuarios`, "", {params: params}).pipe(tap({
      next:(data)=> {
        this.openSnackBar(data.message as string, "OK")

        if(data.error!=undefined) return
        const id = data.data as unknown as number
        const user: Usuario = {...usuario, id: id}
        console.log("POST hapening")
        this.list?.add(user) //data.data para servidor
      }
    }),catchError((err)=>{
      this.openSnackBar(err.error.message as string, "OK")
      return throwError(err)
      }));
  }

  edit_usuario(usuario: UsuarioEdit): Observable<any> {
    if (!usuario.id) {
      return throwError("usuario sem id");
    }

    const params = new HttpParams()
      .append('email', usuario.email)
      .append('name', usuario.name)
      .append('password', usuario.password)
      .append('cargo_id', usuario.cargo.id)
    return this.http.post<DataResult<Usuario>>(`${this.url}/admin/usuarios/${usuario.id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        this.openSnackBar(data.message as string, "OK")

        if(data.error!=undefined) return
        this.list?.edit(usuario) //data.data para servidor
      }
    }),catchError((err)=>{
      this.openSnackBar(err.error.message as string, "OK")
      return throwError(err)
      }));
  }

  remove(id : number): Observable<any>{
    return this.http.delete<DataResult<Usuario>>(`${this.url}/admin/usuarios/${id}`).pipe(tap({
      next:(data)=> {
        this.openSnackBar(data.message as string, "OK")

        console.log(data)
        if(data.error!=undefined) return
        this.list?.delete(id)
      }
    }),catchError((err)=>{
      this.openSnackBar(err.error.message as string, "OK")
      return throwError(err)
      }));
  }
}
