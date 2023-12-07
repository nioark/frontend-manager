import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataResult } from 'src/app/models/data-result.model';
import { throwError } from 'rxjs';
import { ListenData } from 'src/app/models/listen-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewTokenComponent } from '../components/new-token/new-token.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ServidoresService {
  list: ListenData<Servidor>|undefined

  url:string
  constructor(private http: HttpClient, public dialog: MatDialog,  private _snackBar: MatSnackBar) {
    this.url=environment.backend
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  fetch(): Observable<Servidor[]> {
    return this.http.get<DataResult<Servidor[]>>(`${this.url}/protected/servidores`).pipe(
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
    return this.http.get<DataResult<Servidor>>(`${this.url}/protected/servidores/${id}`).pipe(
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
      .append('comentario', servidor.comentario as string)

    return this.http.post<DataResult<Servidor>>(`${this.url}/protected/servidores`, "", {params: params}).pipe(tap({
      next:(data)=> {
        this.openSnackBar(data.message as string, "OK")
        if (data.data?.serial){
          const dialogRef = this.dialog.open(NewTokenComponent, {
            width: '360px',
            height: '260px',
            data: data.data,
          });
        }

        if(data.error!=undefined) return
        this.list?.add(data.data as Servidor) //data.data para servidor
      }
    }),catchError((err)=>{
      this.openSnackBar(err.error.message as string, "OK")
      return throwError(err)
      }));
  }

  edit_servidor(servidor: Servidor, resetarSerial: boolean): Observable<any> {
    if (!servidor.id) {
      return throwError("servidor sem id");
    }

    const params = new HttpParams()
      .append('nome', servidor.nome)
      .append('active', servidor.active)
      .append('qtd_usuarios', servidor.qtd_usuarios)
      .append('qtd_usuarios_local', servidor.qtd_usuarios_local)
      .append('qtd_canais', servidor.qtd_canais)
      .append('comentario', servidor.comentario as string)
      .append('resetar_serial', resetarSerial)

    return this.http.post<DataResult<Servidor>>(`${this.url}/protected/servidores/${servidor.id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        this.openSnackBar(data.message as string, "OK")
        console.log("Data from edit server: ", data)
        if (data.data?.serial){
          const dialogRef = this.dialog.open(NewTokenComponent, {
            width: '360px',
            height: '260px',
            data: data.data,
          });
        }

        if(data.error!=undefined) return

        this.get(servidor.id).subscribe((data) => {
          const servidor2 = data;
          this.list?.edit(servidor2);
        });
        //data.data para servidor
      },
    }),catchError((err)=>{
      this.openSnackBar(err.error.message as string, "OK")
      return throwError(err)
    }));
  }

  remove(id : number, comentario : string): Observable<any>{
    const params = new HttpParams()
    .append('comentario', comentario as string)

    return this.http.post<DataResult<Servidor>>(`${this.url}/protected/servidor-delete/${id}`, "", {params: params}).pipe(tap({
      next:(data)=> {
        this.openSnackBar(data.message as string, "OK")

        console.log(data)
        if(data.error!=undefined) return
        this.list?.softDelete(id)
      }
    }),catchError((err)=>{
      this.openSnackBar(err.error.message as string, "OK")
      return throwError(err)
      }));
  }
}
