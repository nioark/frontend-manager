import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddServidorComponent } from 'src/app/components/addServidor/addServidor.component';
import { EditServidorComponent } from 'src/app/components/editServidor/editServidor.component';
import { ViewServidorComponent } from 'src/app/components/viewServidor/viewServidor.component';


export interface ServidorElement {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
}

const ELEMENT_DATA: ServidorElement[] = [
  {nome: "Bremer", active: true, qtd_usuarios: 100, qtd_usuarios_local: 50, qtd_canais: 2},
  {nome: "Contabilidade Wagner", active: true, qtd_usuarios: 50, qtd_usuarios_local: 20, qtd_canais: 5},
  {nome: "Postos Russi", active: true, qtd_usuarios: 150, qtd_usuarios_local: 20, qtd_canais: 5},
  {nome: "Postos Pilão", active: false, qtd_usuarios: 120, qtd_usuarios_local: 50, qtd_canais: 10},
];


@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'active', 'qtd_usuarios', 'qtd_usuarios_local', 'qtd_canais'];
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
    const dialogRef = this.dialog.open(AddServidorComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add dialog was closed');
      // this.animal = result;
    });

    console.log("Add servidor");
  }

  editServidor(server: ServidorElement){
    const dialogRef = this.dialog.open(EditServidorComponent, {
      width: '500px',
      height: '500px',
      data: server,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      // this.animal = result;
    });
    console.log("Edit servidor", server);
  }

  viewServidor(server: ServidorElement){
    const dialogRef = this.dialog.open(ViewServidorComponent, {
      width: '500px',
      height: '500px',
      data: server
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The view dialog was closed');
      // this.animal = result;
    });

    console.log("View servidor");
  }
}
