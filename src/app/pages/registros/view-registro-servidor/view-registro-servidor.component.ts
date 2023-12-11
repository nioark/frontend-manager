import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';
import { ServidoresService } from '../../servidores/services/servidores.service';
import { EditServidorComponent } from '../../servidores/components/editServidor/editServidor.component';
import { ViewActionDataComponent } from '../view-action-data/view-action-data.component';

@Component({
  selector: 'app-view-registro-usuario-servidor',
  templateUrl: './view-registro-servidor.component.html',
  styleUrls: ['./view-registro-servidor.component.scss']
})
export class ViewRegistroServidorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _serverSrv : ServidoresService, private dialog: MatDialog, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  viewServer(){
    const server = this._serverSrv.get(this.data.object_id).subscribe((data) => {
      const dialogRef = this.dialog.open(ViewServidorComponent, {
        width: '500px',
        maxHeight: '620px',
        data: data,
      });
    });

  }

  editServer(){
    const server = this._serverSrv.get(this.data.object_id).subscribe((data) => {
      const dialogRef = this.dialog.open(EditServidorComponent, {
        width: '500px',
        maxHeight: '620px',
        data: data,
      });
    });
  }

  viewChanges(){
    const dialogRef = this.dialog.open(ViewActionDataComponent, {
      width: '500px',
      maxHeight: '620px',
      data: this.data.action_data,
    });
  }

}
