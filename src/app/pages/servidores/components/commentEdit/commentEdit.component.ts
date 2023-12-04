import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServidoresService } from '../../services/servidores.service';
import { AddServidorComponent } from '../addServidor/addServidor.component';
import { Servidor } from 'src/app/models/servidor';


@Component({
  selector: 'app-commentEdit',
  templateUrl: './commentEdit.component.html',
  styleUrls: ['./commentEdit.component.css']
})
export class CommentEditComponent implements OnInit {
  canSubmit$ = false;
  @ViewChildren("comentario") comentario!: QueryList<ElementRef>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Servidor, private _dialogRef: MatDialogRef<AddServidorComponent>, private _servidoresSrv:ServidoresService) { }

  ngOnInit() {
  }

  submit(){
    this.data.comentario = this.comentario.first.nativeElement.value;
    this._servidoresSrv.edit_servidor(this.data, false).subscribe((data) => {
      console.log(data);
      this.closeDialog();
    })
  }

  inputChanged() {
    setTimeout(() => {
      if (this.comentario.first.nativeElement.value == '')
        this.canSubmit$ = false;
      else
        this.canSubmit$ = true;
    }, 100);

  }

  closeDialog() {
    this._dialogRef.close();
  }
}
