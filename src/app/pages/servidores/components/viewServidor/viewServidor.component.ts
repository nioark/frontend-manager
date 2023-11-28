import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';

@Component({
  selector: 'app-view-servidor',
  templateUrl: './viewServidor.component.html',
  styleUrls: ['./viewServidor.component.css']
})
export class ViewServidorComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: Servidor, private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
