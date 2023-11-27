import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteElement, ClientesComponent } from 'src/app/pages/clientes/clientes.component';

@Component({
  selector: 'app-viewCliente',
  templateUrl: './viewCliente.component.html',
  styleUrls: ['./viewCliente.component.css']
})
export class ViewClienteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ClienteElement, private _dialogRef: MatDialogRef<ViewClienteComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
