import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServidoresService } from '../../services/servidores.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './deleteServidor.component.html',
  styleUrls: ['./deleteServidor.component.css']
})
export class DeleteServidorComponent implements OnInit {
  @ViewChildren("comentario") comentario!: QueryList<ElementRef>;
  canSubmit$ = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private _dialogRef: MatDialogRef<DeleteServidorComponent>, private _servidoresSrv:ServidoresService) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  inputChanged() {
    setTimeout(() => {
      if (this.comentario.first.nativeElement.value == '')
        this.canSubmit$ = false;
      else
        this.canSubmit$ = true;
    }, 100);

  }

  deleteServidor(){
    this._servidoresSrv.remove(this.data, this.comentario.first.nativeElement.value).subscribe((data) => {
      console.log(data);
      this.closeDialog();
    })
  }

}
