import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface ServidorElement {
  nome: string;
  active: boolean;
  qtd_usuarios: number;
  qtd_usuarios_local: number;
  qtd_canais: number;
}

@Component({
  selector: 'app-editServidor',
  templateUrl: './editServidor.component.html',
  styleUrls: ['./editServidor.component.css']
})
export class EditServidorComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServidorElement, private _dialogRef: MatDialogRef<EditServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
