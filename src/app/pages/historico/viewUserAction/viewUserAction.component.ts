import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';

@Component({
  selector: 'app-viewUserAction',
  templateUrl: './viewUserAction.component.html',
  styleUrls: ['./viewUserAction.component.scss']
})
export class ViewUserActionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: UsuarioAction, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
