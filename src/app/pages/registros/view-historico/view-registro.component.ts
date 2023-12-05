import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { Usuario, UsuarioAction } from 'src/app/models/usuario';

@Component({
  selector: 'app-view-registro-servidor',
  templateUrl: './view-registro.component.html',
  styleUrls: ['./view-registro.component.scss']
})
export class ViewRegistroComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  viewServer(){
    const dialogRef = this.dialog.open(ViewServidorComponent, {
      width: '500px',
      height: '500px',
      data: this.data,
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The view dialog was closed');
    });

    console.log("View servidor");
  }

}
