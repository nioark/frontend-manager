import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';
import { HistoricosService } from './services/historicos.service';
import { Historico } from 'src/app/models/historicos';
import { Observable, forkJoin, zip } from 'rxjs';
import { ServidoresService } from '../servidores/services/servidores.service';
import { Servidor } from 'src/app/models/servidor';
import { MatCheckbox } from '@angular/material/checkbox';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Searcher } from 'fast-fuzzy';
import { ViewRegistroUsuarioComponent } from './view-registro-usuario/view-registro-usuario.component';
import { ViewRegistroServidorComponent } from './view-registro-servidor/view-registro-servidor.component';
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
  @ViewChildren("filtro") filtro!: QueryList<ElementRef>;

  showDeleted: boolean = false;

  private servers : Servidor[] | undefined;
  private fetchedData : Historico[] | undefined;
  private fetchedDataFiltred : any[] | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtroChange(data : string){
    setTimeout(() => {
      const filtro = this.filtro.first.nativeElement.value

      if (filtro == ""){
        if (this.showDeleted)
          this.dataSource.data = this.fetchedData as any[]
        else
          this.dataSource.data = this.fetchedDataFiltred as any[]
        return
      }

      let searcher;

      if (this.showDeleted){
        searcher = new Searcher(
          this.fetchedData as any[],
          {keySelector: (obj) => obj.action},
        );
      } else {
        searcher = new Searcher(
          this.fetchedDataFiltred as any[],
          {keySelector: (obj) => obj.action},
        );
      }

      const result = searcher.search(filtro, {returnMatchData: true});
      this.dataSource.data = result.map((data) => data.item);
    }, 100);



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
        let historicos = this.organizeById(dataHistoricos, serverId);
        this.processHistoricos(historicos, dataServers, dataUsuarios);
        this.filterDeleted(historicos, dataServers, dataUsuarios);
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

  organizeById(dataHistoricos: any[], serverId: number | undefined) {
    let historicos = dataHistoricos?.sort((a, b) => b.id - a.id) as any[];
    if (serverId != null)
      historicos = historicos.filter((history) => history.object_id == serverId)
    return historicos;
  }

  processHistoricos(historicos: any[], dataServers: any[], dataUsuarios: any[]) {
    historicos?.forEach(element  => {
      const historico = element as Historico;
      this.calculateTimeAgo(element, historico);
      this.processElement(element, historico, dataServers, dataUsuarios);
    });
  }

  calculateTimeAgo(element: any, historico: Historico) {
    const timestamp = historico.created_at;
    const date = new Date(timestamp);
    const now = new Date();
    const timeAgo = now.getTime() - date.getTime(); //milliseconds
    element.time_ago = this.getTimeAgoString(timeAgo);
    element.time_ago_ms = timeAgo;
  }

  getTimeAgoString(timeAgo: number) {
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
    return timeAgoString;
  }

  processElement(element: any, historico: Historico, dataServers: any[], dataUsuarios: any[]) {
    element.deleted = true;
    const type_id = element.type_id;
    if (type_id == 0) {
      this.processServerElement(element, historico, dataServers, dataUsuarios);
    } else if (type_id == 1) {
      this.processUserElement(element, historico, dataUsuarios);
    }
  }

  processServerElement(element: any, historico: Historico, dataServers: any[], dataUsuarios: any[]) {
    const server = dataServers.find((server) => server.id === historico.object_id);
    if (server && server.deleted_at == null) {
      element.deleted = false;
    }
    this.assignUserName(element, historico, dataUsuarios);
  }

  processUserElement(element: any, historico: Historico, dataUsuarios: any[]) {
    let user_object = dataUsuarios.find((user) => user.id === historico.object_id);
    if (user_object) {
      element.deleted = false;
    }
    this.assignUserName(element, historico, dataUsuarios);
  }

  assignUserName(element: any, historico: Historico, dataUsuarios: any[]) {
    let user = dataUsuarios.find((user) => user.id === historico.usuario_id)
    element.name = user?.name
    if (element.name == null){
      if (element.usuario_id == 1)
        element.name = 'admin'
      else
        element.name = 'deletado'
    }
  }

  filterDeleted(historicos: any[], dataServers: any[], dataUsuarios: any[]) {
    if (this.showDeleted == false){
      this.dataSource.data = historicos.filter((history) => this.isNotDeleted(history, dataServers, dataUsuarios));
      this.fetchedDataFiltred = this.dataSource.data;
    }
  }

  isNotDeleted(history: any, dataServers: any[], dataUsuarios: any[]) {
    if (history.type_id == 0){
      const server = dataServers.find((server) => server.id == history.object_id)
      if (server && server.deleted_at == null)
        return true
      return false
    }
    else if (history.type_id == 1){
      const user = dataUsuarios.find((user) => user.id == history.object_id)
      if (user)
        return true
      return false
    }
    return false
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
    const date = new Date(data.created_at);

    let minutes: any = date.getMinutes();
    if (minutes < 10)
      minutes = `0${minutes}`;
    const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
    data.timestamp = formatedDate;

    if (data.type_id == 0){
      const dialogRef = this.dialog.open(ViewRegistroServidorComponent, {
        width: '500px',
        maxHeight: '620px',
        data: data
      });
    }
    else if (data.type_id == 1){
      const dialogRef = this.dialog.open(ViewRegistroUsuarioComponent, {
        width: '500px',
        maxHeight: '620px',
        data: data
      });
    }
  }

  toggleShowDeleted(){
    this.showDeleted = this.checkbox.first.checked;

    if (this.showDeleted == false && this.fetchedData){
      this.dataSource.data = this.fetchedDataFiltred as Historico[]
    }
    else if(this.fetchedData){
      this.dataSource.data = this.fetchedData
    }
  }
}
