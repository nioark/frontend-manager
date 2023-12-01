import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Utils from "chart.js/auto"
import { ServidoresService } from '../servidores/services/servidores.service';
import { Servidor } from 'src/app/models/servidor';
import { Observable } from 'rxjs';
import { ClientesService } from '../clientes/services/clientes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  servidores$?: Observable<Servidor[] | undefined>

  serverCount: number = 0;
  serversAtivo: number = 0;
  serversInativo: number = 0;
  clienteCount: number = 0;

  constructor(private _servidoresSrv: ServidoresService, private _clientesSrv: ClientesService) { }

  ngOnInit(): void {
    this.servidores$ = this._servidoresSrv.fetch();

    this.servidores$?.subscribe((data: Servidor[] | undefined) => {
      console.log("Data from server: ", data)
      this.serverCount = data?.length as number;

      this.serversAtivo = data?.filter((item: Servidor) => item.active == true).length as number;
      this.serversInativo = data?.filter((item: Servidor) => item.active == false).length as number;
    })

    this._clientesSrv.fetch().subscribe((data: any) => {
      this.clienteCount = data.length;
    })

    this.createChart();
  }

  createChart(){
    const labels = [];
    const date = new Date();
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
      labels.push(capitalizedMonth);
    }
    console.log(labels)

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Novos Clientes',
          data: [5,8,4,3,3,2,4,2,5,4,4,3],
          borderWidth: 1,

          borderColor: [
            'rgb(0, 0, 256,0.8)',
          ],
        }],

      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio:2.5,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

}
