import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewUserActionComponent } from 'src/app/pages/historico/viewUserAction/viewUserAction.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';

const adm = {nome: "Administrador", permissao: 1, id: 1};
const gerente = {nome: "Gerente", permissao: 0, id: 2};

const usuario1: Usuario = {id: 1, nome: "Leandro", created_at: "2021-08-01", cargo: adm};
const usuario2: Usuario = {id: 2, nome: "Jeferson", created_at: "2021-08-01", cargo: adm};

const ELEMENT_DATA: UsuarioAction[] = [
  {usuario: usuario1, acao:"Editou o servidor 'Servidor 1'", comentario: "Comentário 1"},
  {usuario: usuario2, acao:"Editou o servidor 'Servidor 2'", comentario: "Comentário 2"},
];

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'acao'];
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

  viewAction(data: UsuarioAction){
    const dialogRef = this.dialog.open(ViewUserActionComponent, {
      width: '500px',
      height: '500px',
      data: data
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The view dialog was closed');
      // this.animal = result;
    });

    console.log("View cliente");
  }
}
