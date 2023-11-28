import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Cargo } from 'src/app/models/cargos';
import { Servidor } from 'src/app/models/servidor';
import { UsuarioEdit } from 'src/app/models/usuario';

const adm = {nome: "Administrador", permissao: 1};
const gerente = {nome: "Gerente", permissao: 0};


@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent{
  cargos: Cargo[] = [adm, gerente]

  constructor(@Inject(MAT_DIALOG_DATA) public data: UsuarioEdit, private _dialogRef: MatDialogRef<EditUsuarioComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
