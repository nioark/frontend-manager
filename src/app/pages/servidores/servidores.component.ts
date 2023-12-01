import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'active', 'qtd_usuarios', 'qtd_usuarios_local', 'qtd_canais'];
  dataSource = new MatTableDataSource();
  @ViewChild("tablee")
  table!: MatTable<any>;

  servidores$?: Observable<Servidor[] | undefined>

  constructor(private _liveAnnouncer: LiveAnnouncer,  private _servidoresSrv:ServidoresService,public dialog: MatDialog,  private changeDetectorRefs: ChangeDetectorRef) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.servidores$ = this._servidoresSrv.fetch();

    this.servidores$?.subscribe((data: Servidor[] | undefined) => {
      console.log("Data from server: ", data)
      const datasource = data as Servidor[];
      this.dataSource.data = datasource?.sort((a, b) => b.id - a.id);
      console.log(datasource)
    })

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
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add dialog was closed');
      // this.animal = result;

    });

    console.log("Add servidor");
  }

  editServidor(server: Servidor){
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

  viewServidor(serverTable: Servidor){
    const serverData: Servidor = {...serverTable};
    const dialogRef = this.dialog.open(ViewServidorComponent, {
      width: '500px',
      height: '500px',
      data: serverData,
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The view dialog was closed');
    });

    console.log("View servidor");
  }

  deleteServidor(id: number){
    console.log("Delete servidor", id);
    const dialogRef = this.dialog.open(DeleteServidorComponent, {
      width: '360px',
      height: '170px',
      data: id,
    });
  }
}
