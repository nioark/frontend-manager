import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private _dialogRef: MatDialogRef<DeleteUsuarioComponent>, private _usuariosSrv:UsuariosService) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  deleteUsuario(){
    this._usuariosSrv.remove(this.data).subscribe((data) => {
      console.log(data);
      this.closeDialog();
    })
  }

}
