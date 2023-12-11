import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddServidorComponent } from 'src/app/pages/servidores/components/addServidor/addServidor.component';
import { EditServidorComponent } from 'src/app/pages/servidores/components/editServidor/editServidor.component';
import { ViewServidorComponent } from 'src/app/pages/servidores/components/viewServidor/viewServidor.component';
import { Servidor } from 'src/app/models/servidor';
import { Usuario, UsuarioEdit } from 'src/app/models/usuario';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './components/delete-usuario/delete-usuario.component';
import { UsuariosService } from './services/usuarios.service';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/cargos';
import { CargosService } from './services/cargos.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'cargo'];
  dataSource = new MatTableDataSource();
  usuarios$?: Observable<Usuario[] | undefined>
  cargos$?: Observable<Cargo[] | undefined>
  permission_level: number = -1;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _loginSrv: LoginService,  private _cargosSrv:CargosService,  private _usuariosSrv:UsuariosService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    const userLogged = this._loginSrv.retrieveData()

    this.cargos$ = this._cargosSrv.fetch();
    this.cargos$?.subscribe((dataCargos: Cargo[] | undefined) => {
      this.usuarios$ = this._usuariosSrv.fetch();

      const userLogged = this._loginSrv.retrieveData()
      // Solver for the usuario cargo_id to the Cargo object
      // cargo name --> usuario.cargo.name
      this.usuarios$?.subscribe((dataUsuarios: any[] | undefined) => {
        dataUsuarios = dataUsuarios?.filter((usuario: any) => usuario.id != userLogged?.id)

        dataUsuarios?.forEach((usuario: any, index) => {
          let cargo_id : number;
          if (usuario.cargo_id === undefined)
            cargo_id = usuario.cargo.id
          else
            cargo_id = usuario.cargo_id

          const cargo: Cargo = dataCargos?.find(cargo => cargo.id === cargo_id) as Cargo
          const usuarioNew: Usuario = {
            name: usuario.name,
            id: usuario.id,
            cargo: cargo,
            email: usuario.email,
          }

          if (dataUsuarios)
            dataUsuarios[index] = usuarioNew
        })

        const datasource = dataUsuarios as Usuario[];
        this.dataSource.data = datasource?.sort((a, b) => b.id - a.id);
      });
    });

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

  addServidor(){
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '500px',
      maxHeight: '620px',
    });
  }

  editUsuario(data: UsuarioEdit){
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '500px',
      maxHeight: '620px',
      data: data,
    });
  }

  deleteUsuario(id : number){
    const dialogRef = this.dialog.open(DeleteUsuarioComponent, {
      width: '360px',
      height: '170px',
      data: id,
    });
  }
}
