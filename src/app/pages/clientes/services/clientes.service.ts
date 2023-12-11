import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataResult } from 'src/app/models/data-result.model';
import { ListenData } from 'src/app/models/listen-data.model';
import { Cliente } from 'src/app/models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  list: ListenData<Cliente>|undefined

  url:string
  constructor(private http: HttpClient) {
    this.url=environment.backend
  }

  fetch(): Observable<Cliente[]> {
    return this.http.get<DataResult<Cliente[]>>(`${this.url}/protected/clientes`).pipe(
      map(data => data?.data?.length ? data.data : []),
      tap({
        next: data=> this.list = new ListenData<Cliente>(data)
      }),
      switchMap((data) => this.list  ? this.list?.data$ : of(data)),
    );
  }
}
