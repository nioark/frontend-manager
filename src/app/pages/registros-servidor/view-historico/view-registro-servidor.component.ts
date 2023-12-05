import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';

@Component({
  selector: 'app-view-registro-servidor',
  templateUrl: './view-registro-servidor.component.html',
  styleUrls: ['./view-registro-servidor.component.scss']
})
export class ViewRegistroServidorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
