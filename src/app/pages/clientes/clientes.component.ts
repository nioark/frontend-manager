import { Component } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewClienteComponent } from 'src/app/pages/clientes/components/viewCliente/viewCliente.component';
import { Cliente } from 'src/app/models/cliente';
import { Observable } from 'rxjs';
import { ClientesService } from './services/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'cnpj', 'accept_terms'];
  dataSource = new MatTableDataSource();

  clientes$?: Observable<Cliente[] | undefined>

  constructor(private _liveAnnouncer: LiveAnnouncer, private _clientesSrv: ClientesService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.clientes$ = this._clientesSrv.fetch();

    this.clientes$.subscribe((dataClientes: Cliente[] | undefined) => {
      const datasource = dataClientes as Cliente[];
      this.dataSource.data = datasource?.sort((a, b) => b.id - a.id);
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

  viewCliente(data: Cliente){
    const dialogRef = this.dialog.open(ViewClienteComponent, {
      width: '500px',
      maxHeight: '620px',
      data: data
    });

  }
}
