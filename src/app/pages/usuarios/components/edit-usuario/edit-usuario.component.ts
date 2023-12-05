import { Observable } from 'rxjs';
import {Component, ElementRef, Inject, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Cargo } from 'src/app/models/cargos';
import { Servidor } from 'src/app/models/servidor';
import { Usuario, UsuarioEdit } from 'src/app/models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { CargosService } from '../../services/cargos.service';


const adm = {nome: "Administrador", permissao: 1, id: 1};
const gerente = {nome: "Gerente", permissao: 0, id: 2};


@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent{
  @ViewChildren("nome") nome!: QueryList<ElementRef>;
  @ViewChildren("password") password!: QueryList<ElementRef>;
  @ViewChildren("email") email!: QueryList<ElementRef>;
  @ViewChildren("cargo") cargo!: QueryList<MatSelect>;
  canSubmit$ = false;
  cargos$: Observable<Cargo[]> | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Usuario, private _usuariosSrv:UsuariosService, private _cargosSrv: CargosService, private _dialogRef: MatDialogRef<EditUsuarioComponent>) { }

  ngOnInit() {
   this.cargos$ = this._cargosSrv.fetch();
  }

  inputChanged() {
    setTimeout(() => {
      let flag = true;

      if (this.nome.first.nativeElement.value == '')
        flag = false
      if (this.cargo.first.selected == undefined)
        flag = false
      if (this.email.first.nativeElement.value == '')
        flag = false

      if (flag)
        this.canSubmit$ = true;
      else
        this.canSubmit$ = false;
    }, 100);
  }

  closeDialog() {
    this._dialogRef.close();
  }

  submitEdit(){
    const val = this.cargo.first.selected as any;
    const cargo : Cargo = {
      id: val.value,
      name: undefined,
      permission_level: undefined
    };
    const nome = this.nome.first.nativeElement.value;
    const senha = this.password.first.nativeElement.value;
    const email = this.email.first.nativeElement.value;

    const userData: UsuarioEdit = {name: nome, password: senha, cargo: cargo, id:this.data.id, email: email};
    this._usuariosSrv.edit_usuario(userData).subscribe((data) => {
      console.log(data);
      this.closeDialog();
    })
  }

}
