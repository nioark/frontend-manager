import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Servidor, ServidorNew } from 'src/app/models/servidor';
import { interval } from 'rxjs';
import { ServidoresService } from '../../services/servidores.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './addServidor.component.html',
  styleUrls: ['./addServidor.component.css']
})
export class AddServidorComponent implements OnInit {
  canSubmit$ = false;
  @ViewChildren("nome") nome!: QueryList<ElementRef>;
  @ViewChildren("ativo") ativo!: QueryList<MatCheckbox>;
  @ViewChildren("usuarios") usuarios!: QueryList<ElementRef>;
  @ViewChildren("usuarios_locais") usuarios_locais!: QueryList<ElementRef>;
  @ViewChildren("canais") canais!: QueryList<ElementRef>;
  @ViewChildren("comentario") comentario!: QueryList<ElementRef>;

  constructor(private _dialogRef: MatDialogRef<AddServidorComponent>, private _servidoresSrv:ServidoresService) { }

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
      if (this.comentario.first.nativeElement.value == '')
        flag = false

      if (flag)
        this.canSubmit$ = true;
      else
        this.canSubmit$ = false;
    }, 100);
  }

  submitAdd() {
    const nome = this.nome.first.nativeElement.value;
    const usuarios = this.usuarios.first.nativeElement.value;
    const usuarios_locais = this.usuarios_locais.first.nativeElement.value;
    const canais = this.canais.first.nativeElement.value;
    const ativo = this.ativo.first.checked;
    const comentario = this.comentario.first.nativeElement.value;

    const serverData: ServidorNew = {nome: nome, active: ativo, qtd_usuarios: usuarios, qtd_usuarios_local: usuarios_locais, qtd_canais: canais, comentario: comentario};
    this._servidoresSrv.add_servidor(serverData).subscribe((data) => {
      this.closeDialog();
    })
  }
}
