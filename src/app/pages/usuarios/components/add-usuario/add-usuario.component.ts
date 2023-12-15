import { UsuariosService } from './../../services/usuarios.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Cargo } from 'src/app/models/cargos';
import { Servidor } from 'src/app/models/servidor';
import { UsuarioNew } from 'src/app/models/usuario';
import { CargosService } from '../../services/cargos.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  @ViewChildren("nome") nome!: QueryList<ElementRef>;
  @ViewChildren("password") password!: QueryList<ElementRef>;
  @ViewChildren("email") email!: QueryList<ElementRef>;
  @ViewChildren("cargo") cargo!: QueryList<MatSelect>;
  @ViewChildren("confirmpassword") confirmPassword!: QueryList<ElementRef>;

  canSubmit$ = false;
  cargos$: Observable<Cargo[]> | undefined;
  cargos: Cargo[] = [];

  constructor(private _dialogRef: MatDialogRef<AddUsuarioComponent>, private _cargosSrv:CargosService, private _usuariosSrv:UsuariosService) { }

  ngOnInit() {
    this.cargos$ = this._cargosSrv.fetch().pipe(map(data => {
      data.shift()
      this.cargos = data
      return data;
    }));

  }

  inputChanged() {
    setTimeout(() => {
      let flag = true;

      if (this.nome.first.nativeElement.value == '')
        flag = false
      if (this.password.first.nativeElement.value == '')
        flag = false
      if (this.cargo.first.selected == undefined)
        flag = false
      if (this.email.first.nativeElement.value == '')
        flag = false
        if (this.confirmPassword.first.nativeElement.value != this.password.first.nativeElement.value)
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

  submitAdd(){
    const val = this.cargo.first.selected as any;
    const cargo_id = val.value;
    const cargo = this.cargos.find(cargo => cargo.id === cargo_id) as Cargo

    const nome = this.nome.first.nativeElement.value;
    const senha = this.password.first.nativeElement.value;
    const email = this.email.first.nativeElement.value;

    const userData: UsuarioNew = {name: nome, password: senha, cargo: cargo, email: email};
    this._usuariosSrv.add_usuario(userData).subscribe((data) => {
      this.closeDialog();
    })
  }
}
