import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';

import { Historico } from 'src/app/models/historicos';
import { Observable } from 'rxjs';
import { HistoricosService } from '../registros/services/historicos.service';
import { ActivatedRoute } from '@angular/router';
import { ViewRegistroComponent } from '../registros/view-historico/view-registro.component';

@Component({
  selector: 'app-registro-servidor-view',
  templateUrl: './registro-servidor.component.html',
  styleUrls: ['./registro-servidor.component.scss']
})
export class RegistroServidorComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'acao', 'quando'];
  dataSource = new MatTableDataSource();

  historico$?: Observable<Historico[] | undefined>

  constructor(private _liveAnnouncer: LiveAnnouncer, private _historicosSrv: HistoricosService, public dialog: MatDialog, private route: ActivatedRoute) {}

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    const serverId = parseInt(this.route.snapshot.paramMap.get('id') as string)
    this.historico$ = this._historicosSrv.fetch();

    this.historico$.subscribe((dataHistorico: Historico[] | undefined) => {
      console.log("Data historico: ", dataHistorico)
      let datasource = dataHistorico as Historico[];
      datasource = datasource?.filter((x) => x.server_id == serverId)
      this.dataSource.data = datasource?.sort((a, b) => b.id - a.id);

      dataHistorico?.forEach(element => {
        const historico = element as Historico;
        const timestamp = historico.created_at;

        const date = new Date(timestamp);
        console.log(timestamp, date)
        const now = new Date();
        const timeAgo = now.getTime() - date.getTime(); //milliseconds

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



        element.time_ago = timeAgoString
      });


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

  viewAction(data: any){
    console.log("Inject data: ", data)
    const date = new Date(data.created_at);

    let minutes: any = date.getMinutes();
    if (minutes < 10)
      minutes = `0${minutes}`;
    const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
    data.timestamp = formatedDate;

    const dialogRef = this.dialog.open(ViewRegistroComponent, {
      width: '500px',
      height: '500px',
      data: data
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The view dialog was closed');
    //   // this.animal = result;
    // });
  }
}
