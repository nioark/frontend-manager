import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ServidorElement {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
}

@Component({
  selector: 'app-viewServidor',
  templateUrl: './viewServidor.component.html',
  styleUrls: ['./viewServidor.component.css']
})
export class ViewServidorComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServidorElement, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
