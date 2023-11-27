import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewClienteComponent } from 'src/app/components/viewCliente/viewCliente.component';

export interface ClienteElement {
  nome: string;
  cnpj: string;
  accept_terms: boolean;
}

const ELEMENT_DATA: ClienteElement[] = [
  {nome: "Bremer", cnpj: "XX.XXX.XXX/0001-XX.", accept_terms: true},
  {nome: "Contabilidade Wagner", cnpj:"XX.XXX.XXX/0001-XX.", accept_terms: true},
  {nome: "Postos Russi", cnpj: "XX.XXX.XXX/0001-XX.", accept_terms: true},
  {nome: "Postos Pilão", cnpj: "XX.XXX.XXX/0001-XX.", accept_terms: false},



];
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'cnpj', 'accept_terms'];
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

  viewCliente(data: ClienteElement){
    const dialogRef = this.dialog.open(ViewClienteComponent, {
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
