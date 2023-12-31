import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddServidorComponent } from 'src/app/pages/servidores/components/addServidor/addServidor.component';
import { EditServidorComponent } from 'src/app/pages/servidores/components/editServidor/editServidor.component';
import { ViewServidorComponent } from 'src/app/pages/servidores/components/viewServidor/viewServidor.component';
import {  Servidor } from 'src/app/models/servidor';
import { ServidoresService } from './services/servidores.service';
import { Observable } from 'rxjs';
import { DeleteServidorComponent } from './components/deleteServidor/deleteServidor.component';
import { CommentEditComponent } from './components/commentEdit/commentEdit.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { LoginService } from '../login/services/login.service';
import { CargosService } from '../usuarios/services/cargos.service';
import { Cargo } from 'src/app/models/cargos';
import { Router } from '@angular/router';
import { Searcher } from 'fast-fuzzy';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'active', 'qtd_usuarios', 'qtd_usuarios_local', 'qtd_canais'];
  dataSource = new MatTableDataSource();
  @ViewChild("tablee")
  @ViewChildren("checkbox") checkbox!: QueryList<MatCheckbox>;
  @ViewChildren("filtro") filtro!: QueryList<ElementRef>;
  showDeleted: boolean = false;
  table!: MatTable<any>;

  servidores$?: Observable<Servidor[] | undefined>
  permission_level: number = -1;
  fetchedData : Servidor[] | undefined;
  fetchedDataFiltred : any[] | undefined;


  constructor(private _liveAnnouncer: LiveAnnouncer,  private _router: Router, private _cargosSrv: CargosService, private _loginSrv: LoginService,  private _servidoresSrv:ServidoresService,public dialog: MatDialog,  private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  filtroChange(filtro : string){
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
          {keySelector: (obj) => obj.nome},
        );
      } else {
        searcher = new Searcher(
          this.fetchedDataFiltred as any[],
          {keySelector: (obj) => obj.nome},
        );
      }

      const result = searcher.search(filtro, {returnMatchData: true});
      this.dataSource.data = result.map((data) => data.item);
    }, 100);

  }


  ngAfterViewInit() {
    this.servidores$ = this._servidoresSrv.fetch();

    this.servidores$?.subscribe((data: Servidor[] | undefined) => {
      const datasource = data as Servidor[];
      // this.dataSource.data = datasource?.sort((a, b) => b.id - a.id);

      let servers = datasource?.sort((a, b) => {
        if (a.deleted_at && !b.deleted_at) {
          return 1; // a comes after b
        } else if (!a.deleted_at && b.deleted_at) {
          return -1; // a comes before b
        } else {
          return b.id - a.id; // sort by id (reverse order)
        }
      });

      this.fetchedData = servers;

      if (!this.showDeleted) {
        servers = servers?.filter((server) => !server.deleted_at);
        this.fetchedDataFiltred = servers;
      }

      this.dataSource.data = servers
    })

    this._cargosSrv.fetch().subscribe((dataCargos: Cargo[]) => {
      const cargoId = this._loginSrv.retrieveData().cargo_id
      const cargo = dataCargos.find(cargo => cargo.id == cargoId) as Cargo

      if (cargo.permission_level != undefined){
        this.permission_level = cargo.permission_level
      }
    });

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      setTimeout(() => {this.dataSource.paginator = this.paginator!;}, 10);
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

  addServidor(){
    const dialogRef = this.dialog.open(AddServidorComponent, {
      width: '500px',
      maxHeight: '620px',
    });
  }

  editServidor(server: Servidor){
    const dialogRef = this.dialog.open(EditServidorComponent, {
      width: '500px',
      height: '',
      maxHeight: '620px',
      data: server,
    });

  }

  viewServidor(serverTable: Servidor){
    const serverData: Servidor = {...serverTable};
    const dialogRef = this.dialog.open(ViewServidorComponent, {
      width: '500px',
      height: '',
      maxHeight: '620px',
      data: serverData,
    });
  }

  deleteServidor(id: number){
    const dialogRef = this.dialog.open(DeleteServidorComponent, {
      width: '360px',
      height: '260px',
      data: id,
    });
  }

  changeServerActive(server : Servidor, state : boolean){
    const serverData: Servidor = {...server, active: state};

    const dialogRef = this.dialog.open(CommentEditComponent, {
      width: '500px',
      height: '280px',
      data: serverData,
    });
  }

  toggleShowDeleted(){
    this.showDeleted = this.checkbox.first.checked;

    if (this.showDeleted == false && this.fetchedData){
      this.dataSource.data = this.fetchedData.filter((server) => {
        return !(server.deleted_at != null)
      })
    }
    else if(this.fetchedData){
      this.dataSource.data = this.fetchedData
    }

  }

  viewHistorico(id : number) {
    this._router.navigate([environment.url + '/registro/', id]);
    //Todo navigate to route
  }
}
