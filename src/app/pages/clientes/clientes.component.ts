import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  nome: string;
  cnpj: string;
  accept_terms: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
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

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

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
}
