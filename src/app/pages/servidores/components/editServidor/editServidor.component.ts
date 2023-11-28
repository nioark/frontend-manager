import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './editServidor.component.html',
  styleUrls: ['./editServidor.component.css']
})
export class EditServidorComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Servidor, private _dialogRef: MatDialogRef<EditServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
