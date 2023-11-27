import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addServidor',
  templateUrl: './addServidor.component.html',
  styleUrls: ['./addServidor.component.css']
})
export class AddServidorComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<AddServidorComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
