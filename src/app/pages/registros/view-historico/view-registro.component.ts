import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';
import { ServidoresService } from '../../servidores/services/servidores.service';
import { EditServidorComponent } from '../../servidores/components/editServidor/editServidor.component';

@Component({
  selector: 'app-view-registro-servidor',
  templateUrl: './view-registro.component.html',
  styleUrls: ['./view-registro.component.scss']
})
export class ViewRegistroComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _serverSrv : ServidoresService, private dialog: MatDialog, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  viewServer(){
    const server = this._serverSrv.get(this.data.server_id).subscribe((data) => {
      const dialogRef = this.dialog.open(ViewServidorComponent, {
        width: '500px',
        height: '500px',
        data: data,
      });
    });



    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The view dialog was closed');
    // });

    console.log("View servidor");
  }

  editServer(){
    const server = this._serverSrv.get(this.data.server_id).subscribe((data) => {
      const dialogRef = this.dialog.open(EditServidorComponent, {
        width: '500px',
        height: '500px',
        data: data,
      });
    });
  }

}
