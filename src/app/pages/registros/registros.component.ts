import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';
import { HistoricosService } from './services/historicos.service';
import { Historico } from 'src/app/models/historicos';
import { Observable, forkJoin, zip } from 'rxjs';
import { ViewRegistroComponent } from './view-historico/view-registro.component';
import { ServidoresService } from '../servidores/services/servidores.service';
import { Servidor } from 'src/app/models/servidor';
import { MatCheckbox } from '@angular/material/checkbox';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-servidor-view',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'action', 'time_ago_ms'];
  dataSource = new MatTableDataSource();

  historico$?: Observable<Historico[] | undefined>

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private _usuariosSrv : UsuariosService, private _serverSrv: ServidoresService, private _historicosSrv: HistoricosService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @ViewChildren("checkbox") checkbox!: QueryList<MatCheckbox>;
  showDeleted: boolean = false;

  private servers : Servidor[] | undefined;
  private fetchedData : Historico[] | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    let idValue = this.route.snapshot.paramMap.get('id')
    let serverId : number | undefined;
    if (idValue!= undefined)
      serverId = parseInt(idValue as string)

    const observable = zip([
      this._serverSrv.fetch(),
      this._historicosSrv.fetch(),
      this._usuariosSrv.fetch()
    ])

    observable.subscribe({
      next: ([dataServers, dataHistoricos, dataUsuarios]) => {

        //Organiza por id e poem deletados embaixo
        let historicos = dataHistoricos?.sort((a, b) => b.id - a.id) as any[];

        console.log(serverId)
        if (serverId != null)
          historicos = historicos.filter((history) => history.server_id == serverId)

        historicos?.forEach(element  => {
          const historico = element as Historico;

          const timestamp = historico.created_at;

          const date = new Date(timestamp);
          const now = new Date();
          const timeAgo = now.getTime() - date.getTime(); //milliseconds

          const seconds = Math.floor(timeAgo / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);

          let timeAgoString = "";
          if (days > 0) {
            timeAgoString = `${days} dia${days > 1 ? 's' : ''} atrás`;
          } else if (hours > 0) {
            timeAgoString = `${hours} hora${hours > 1 ? 's' : ''} atrás`;
          } else if (minutes > 0) {
            timeAgoString = `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
          } else {
            timeAgoString = `${seconds} segundo${seconds > 1 ? 's' : ''} atrás`;
          }

          element.time_ago = timeAgoString
          element.time_ago_ms = timeAgo

          element.deleted = false

          const server = dataServers.find((server) => server.id === historico.server_id);
          if (server && server.deleted_at == null) {
            element.deleted = true;
          }

          const user = dataUsuarios.find((user) => user.id === historico.usuario_id)

          element.name = user?.name
          if (element.name == null)
            element.name = 'deletado'
        });

        if (this.showDeleted == false){
          this.dataSource.data = historicos.filter((history) => {
            const server = dataServers.find((server) => server.id == history.server_id)
            return !(server?.deleted_at != null)
          })
        }
        this.fetchedData = historicos;
        this.servers = dataServers;
      }
    })

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewAction(data: any){
    console.log("Inject data: ", data)
    const date = new Date(data.created_at);

    let minutes: any = date.getMinutes();
    if (minutes < 10)
      minutes = `0${minutes}`;
    const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
    data.timestamp = formatedDate;

    const dialogRef = this.dialog.open(ViewRegistroComponent, {
      width: '500px',
      maxHeight: '620px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The view dialog was closed');
      // this.animal = result;
    });

    console.log("View cliente");
  }

  toggleShowDeleted(){
    this.showDeleted = this.checkbox.first.checked;
    console.log()

    if (this.showDeleted == false && this.fetchedData){
      this.dataSource.data = this.fetchedData.filter((history) => {
        const server = this.servers?.find((server) => server.id == history.server_id)
        return !(server?.deleted_at != null)
      })
    }
    else if(this.fetchedData){
      this.dataSource.data = this.fetchedData
    }
  }
}
