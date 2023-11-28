import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddServidorComponent } from 'src/app/pages/servidores/components/addServidor/addServidor.component';
import { EditServidorComponent } from 'src/app/pages/servidores/components/editServidor/editServidor.component';
import { ViewServidorComponent } from 'src/app/pages/servidores/components/viewServidor/viewServidor.component';
import { ServidorTable, Servidor } from 'src/app/models/servidor';
import { Usuario, UsuarioEdit } from 'src/app/models/usuario';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';


const adm = {nome: "Administrador", permissao: 1, id: 1};
const gerente = {nome: "Gerente", permissao: 0, id: 2};

const usuario1: Usuario = {id: 1, nome: "Leandro", created_at: "2021-08-01", cargo: adm};
const usuario2: Usuario = {id: 2, nome: "Jeferson", created_at: "2021-08-01", cargo: adm};

const ELEMENT_DATA: Usuario[] = [
  usuario1,
  usuario2
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'created_at'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
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
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add dialog was closed');
      // this.animal = result;
    });

    console.log("Add servidor");
  }

  editUsuario(data: Usuario){
    const usuarioData: UsuarioEdit = {...data, senha: "testesenha"};
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      width: '500px',
      height: '500px',
      data: usuarioData,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      // this.animal = result;
    });
    console.log("Edit servidor", data);
  }
}
