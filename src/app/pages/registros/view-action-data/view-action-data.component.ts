import { map } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewServidorComponent } from '../../servidores/components/viewServidor/viewServidor.component';
import { ViewRegistroServidorComponent } from '../view-registro-servidor/view-registro-servidor.component';
import { Servidor } from 'src/app/models/servidor';

@Component({
  selector: 'app-view-action-data',
  templateUrl: './view-action-data.component.html',
  styleUrls: ['./view-action-data.component.scss']
})
export class ViewActionDataComponent implements OnInit {
  public changes :any[] | undefined
  public new_data : any[] | undefined

  constructor(@Inject(MAT_DIALOG_DATA) public action_data: any, private dialog: MatDialog, private _dialogRef: MatDialogRef<ViewRegistroServidorComponent>) {
    interface ParseObject {
      before_action: any,
      after_action: any,
      new_data: any
    }

    var data : ParseObject = JSON.parse(this.action_data)

    if (data.before_action != null){
      this.changes = []

      var index = 0;
      for (const key in data.before_action) {
        if (Object.prototype.hasOwnProperty.call(data.before_action, key)) {
          const before_action = data.before_action;
          if (before_action[key] != data.after_action[key]){

            this.changes.push({
              key: key,
              index: index,
              before_action: before_action[key],
              after_action: data.after_action[key]
            })
            index++;
          }
          // Do something with the key-value pair
        }
      }
    } else {
      this.new_data = []
      var index = 0;
      for (const key in data.new_data) {
        const new_data = data.new_data;
        if (new_data[key] != null && new_data[key] != undefined && new_data[key] != ""){
          this.new_data.push({
            key: key,
            index: index,
            new_data: new_data[key],
          })
          index++;
        }
      }

    }

   }


  ngOnInit(): void {



  }

}
