import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Servidor } from 'src/app/models/servidor';
import { EditServidorComponent } from '../editServidor/editServidor.component';
import { DeleteServidorComponent } from '../deleteServidor/deleteServidor.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-servidor',
  templateUrl: './viewServidor.component.html',
  styleUrls: ['./viewServidor.component.css']
})
export class ViewServidorComponent{

  created_at: String | undefined;
  deleted_at: String | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Servidor, private _router: Router,  private _dialogRef: MatDialogRef<ViewServidorComponent>) { }

  ngOnInit() {
    console.log(this.data)
    const timestamp = this.data.deleted_at as string;
    const timestamp_created_at = this.data.created_at as string;

    this.deleted_at = this.formatDate(new Date(timestamp));
    this.created_at = this.formatDate(new Date(timestamp_created_at));
  }

  private formatDate(timestamp: Date): string {
    const day = timestamp.getDate().toString().padStart(2, '0');
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
    const year = timestamp.getFullYear().toString();
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  closeDialog() {
    this._dialogRef.close();
  }

  viewHistorico() {
    this._router.navigate(['registro/', this.data.id]);
    this.closeDialog();
  }
}
