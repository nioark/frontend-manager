import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataResult } from 'src/app/models/data-result.model';
import { throwError } from 'rxjs';
import { ListenData } from 'src/app/models/listen-data.model';
import { Usuario, UsuarioEdit, UsuarioNew } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  list: ListenData<Usuario>|undefined

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Usuario[]> {
    return this.http.get<DataResult<Usuario[]>>(`${this.url}/usuarios`).pipe(
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
    return this.http.get<DataResult<Usuario>>(`${this.url}/usuarios/${id}`).pipe(
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

    return this.http.post<DataResult<Usuario>>(`${this.url}/usuarios`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.error!=undefined) return
        const id = data.data as unknown as number
        const user: Usuario = {...usuario, id: id}
        console.log("POST hapening")
        this.list?.add(user) //data.data para servidor
      }
    }))
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
    return this.http.post<DataResult<Usuario>>(`${this.url}/usuarios/${usuario.id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.error!=undefined) return
        this.list?.edit(usuario) //data.data para servidor
      }
    }));
  }

  remove(id : number): Observable<any>{
    return this.http.delete<DataResult<Usuario>>(`${this.url}/usuarios/${id}`).pipe(tap({
      next:(data)=> {
        console.log(data)
        if(data.error!=undefined) return
        this.list?.delete(id)
      }
    }));
  }
}
