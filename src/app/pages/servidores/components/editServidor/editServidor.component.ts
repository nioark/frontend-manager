import {Component, ElementRef, Inject, QueryList, ViewChildren} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { ServidoresService } from '../../services/servidores.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './editServidor.component.html',
  styleUrls: ['./editServidor.component.css']
})
export class EditServidorComponent{
  canSubmit$ = false;
  @ViewChildren("nome") nome!: QueryList<ElementRef>;
  @ViewChildren("ativo") ativo!: QueryList<MatCheckbox>;
  @ViewChildren("usuarios") usuarios!: QueryList<ElementRef>;
  @ViewChildren("usuarios_locais") usuarios_locais!: QueryList<ElementRef>;
  @ViewChildren("canais") canais!: QueryList<ElementRef>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Servidor, private _dialogRef: MatDialogRef<EditServidorComponent>, private _servidoresSrv:ServidoresService) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }

  inputChanged() {
    setTimeout(() => {
      let flag = true;

      if (this.usuarios.first.nativeElement.value == '')
        flag = false
      if (this.usuarios_locais.first.nativeElement.value == '')
        flag = false
      if (this.canais.first.nativeElement.value == '')
        flag = false
      if (this.nome.first.nativeElement.value == '')
        flag = false

      if (flag)
        this.canSubmit$ = true;
      else
        this.canSubmit$ = false;
    }, 100);
  }

  submitEdit() {
    const nome = this.nome.first.nativeElement.value;
    const usuarios = this.usuarios.first.nativeElement.value;
    const usuarios_locais = this.usuarios_locais.first.nativeElement.value;
    const canais = this.canais.first.nativeElement.value;
    const ativo = this.ativo.first.checked;
    console.log("Submit: ",nome, usuarios, usuarios_locais, canais, ativo, this.data.id);

    const serverData: Servidor = {
      nome: nome, active: ativo, qtd_usuarios: usuarios,
      qtd_usuarios_local: usuarios_locais, qtd_canais: canais,
      serial: this.data.serial, id: this.data.id
    };

    this._servidoresSrv.edit_servidor(serverData).subscribe((data) => {
      console.log(data);
      this.closeDialog();
    })
  }

}
