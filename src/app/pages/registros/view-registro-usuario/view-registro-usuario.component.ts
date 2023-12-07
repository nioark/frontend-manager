import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';
import { ServidoresService } from '../../servidores/services/servidores.service';
import { EditServidorComponent } from '../../servidores/components/editServidor/editServidor.component';

@Component({
  selector: 'app-view-registro-usuario-servidor',
  templateUrl: './view-registro-usuario.component.html',
  styleUrls: ['./view-registro-usuario.component.scss']
})
export class ViewRegistroUsuarioComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _serverSrv : ServidoresService, private dialog: MatDialog, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
