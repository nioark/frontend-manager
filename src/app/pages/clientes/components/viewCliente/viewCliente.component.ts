import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesComponent } from 'src/app/pages/clientes/clientes.component';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-viewCliente',
  templateUrl: './viewCliente.component.html',
  styleUrls: ['./viewCliente.component.css']
})
export class ViewClienteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente, private _dialogRef: MatDialogRef<ViewClienteComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
