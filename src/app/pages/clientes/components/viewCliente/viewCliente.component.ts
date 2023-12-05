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
  accepted_at: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente, private _dialogRef: MatDialogRef<ViewClienteComponent>) { }

  ngOnInit() {
    console.log(this.data)
    const timestamp = this.data.accepted_at as string;

    this.accepted_at = this.formatDate(new Date(timestamp));
  }

  private formatDate(timestamp: Date): string {
    const day = timestamp.getDate().toString().padStart(2, '0');
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
    const year = timestamp.getFullYear().toString();
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  closeDialog() {
    this._dialogRef.close();
  }
}
