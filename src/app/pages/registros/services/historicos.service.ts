import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataResult } from 'src/app/models/data-result.model';
import { throwError } from 'rxjs';
import { ListenData } from 'src/app/models/listen-data.model';
import { Usuario, UsuarioEdit, UsuarioNew } from 'src/app/models/usuario';
import { Cargo } from 'src/app/models/cargos';
import { Historico } from 'src/app/models/historicos';


@Injectable({
  providedIn: 'root'
})
export class HistoricosService {
  list: ListenData<Historico>|undefined

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Historico[]> {
    return this.http.get<DataResult<Historico[]>>(`${this.url}/protected/historicos`).pipe(
      map(data => data?.data?.length ? data.data : []),
      tap({
        next: data=> this.list = new ListenData<Historico>(data)
      }),
      switchMap((data) => this.list  ? this.list?.data$ : of(data))
    );
  }
}
