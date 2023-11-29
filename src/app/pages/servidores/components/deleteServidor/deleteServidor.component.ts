import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServidoresService } from '../../services/servidores.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './deleteServidor.component.html',
  styleUrls: ['./deleteServidor.component.css']
})
export class DeleteServidorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private _dialogRef: MatDialogRef<DeleteServidorComponent>, private _servidoresSrv:ServidoresService) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  deleteServidor(){
    this._servidoresSrv.remove(this.data).subscribe((data) => {
      console.log(data);
      this.closeDialog();
    })
  }

}
