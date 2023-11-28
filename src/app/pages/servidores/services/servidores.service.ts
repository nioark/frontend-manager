import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataResult } from 'src/app/models/data-result.model';
import { throwError } from 'rxjs';
import { ListenData } from 'src/app/models/listen-data.model';


@Injectable({
  providedIn: 'root'
})
export class ServidoresService {
  list: ListenData<Servidor>|undefined

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Servidor[]> {
    return this.http.get<DataResult<Servidor[]>>(`${this.url}/servidores`).pipe(
      map(data => data?.data?.length ? data.data : []),
      tap({
        next: data=> this.list = new ListenData<Servidor>(data)
      }),
      switchMap((data) => this.list  ? this.list?.data$ : of(data)),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  get(id: number): Observable<Servidor>{
    return this.http.get<DataResult<Servidor>>(`${this.url}/servidores/${id}`).pipe(
      map(data => data.data as Servidor),
      tap({
        next: (x) => console.log(x)
      }),
    );
  }

  add_servidor(servidor: ServidorNew): Observable<any> {
    const params = new HttpParams()
      .append('nome', servidor.nome)
      .append('active', servidor.active)
      .append('qtd_usuarios', servidor.qtd_usuarios)
      .append('qtd_usuarios_local', servidor.qtd_usuarios_local)
      .append('qtd_canais', servidor.qtd_canais)

    return this.http.post<DataResult<Servidor>>(`${this.url}/servidores`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.list?.add(data.data)
      }
    }))
  }

  edit_servidor(servidor: Servidor): Observable<any> {
    if (!servidor.id) {
      return throwError("servidor sem id");
    }

    const params = new HttpParams()
      .append('nome', servidor.nome)
      .append('active', servidor.active)
      .append('qtd_usuarios', servidor.qtd_usuarios)
      .append('qtd_usuarios_local', servidor.qtd_usuarios_local)
      .append('qtd_canais', servidor.qtd_canais)

    return this.http.post<DataResult<Servidor>>(`${this.url}/servidores/${servidor.id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        if(data.data===undefined) return
        this.list?.edit(data.data)
      }
    }));
  }

  remove(id : number): Observable<any>{
    return this.http.delete<DataResult<Servidor>>(`${this.url}/servidores/${id}`).pipe(tap({
      next:(data)=> {
        if(data.data?.id===undefined) return
        this.list?.delete(data.data.id)
      }
    }));
  }
}
