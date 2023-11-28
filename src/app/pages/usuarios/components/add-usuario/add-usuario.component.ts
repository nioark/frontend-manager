import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cargo } from 'src/app/models/cargos';
import { Servidor } from 'src/app/models/servidor';


const adm = {nome: "Administrador", permissao: 1};
const gerente = {nome: "Gerente", permissao: 0};

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  cargos: Cargo[] = [adm, gerente]

  constructor(private _dialogRef: MatDialogRef<AddUsuarioComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
