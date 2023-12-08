import { Cliente } from '../../models/cliente';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Utils from "chart.js/auto"
import { ServidoresService } from '../servidores/services/servidores.service';
import { Servidor } from 'src/app/models/servidor';
import { Observable } from 'rxjs';
import { ClientesService } from '../clientes/services/clientes.service';
import { NgApexchartsModule } from "ng-apexcharts";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> | any;;
  public chart: any;
  servidores$?: Observable<Servidor[] | undefined>

  serverCount: number = 0;
  serversAtivo: number = 0;
  serversInativo: number = 0;
  clienteCount: number = 0;
  clientesData: Cliente[] = [];



  constructor(private _servidoresSrv: ServidoresService, private _clientesSrv: ClientesService) {

  }

  ngOnInit(): void {
    this.servidores$ = this._servidoresSrv.fetch();

    this.servidores$?.subscribe((data: Servidor[] | undefined) => {
      data = data?.filter((item: Servidor) => item.deleted_at == null);
      this.serverCount = data?.length as number;

      this.serversAtivo = data?.filter((item: Servidor) => item.active == true && item).length as number;
      this.serversInativo = data?.filter((item: Servidor) => item.active == false).length as number;
    })

    this._clientesSrv.fetch().subscribe((data: any) => {
      this.clienteCount = data.length;
      this.clientesData = data
      this.createChart();
    })

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

    let clientsEachMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < 12; i++) {
      this.clientesData.forEach((element: any) => {
        const date = new Date(element.created_at);
        const nowYear = new Date().getFullYear();
        if (date.getMonth() == i && date.getFullYear() == nowYear) {
          clientsEachMonth[i] = clientsEachMonth[i] + 1
        }
      });
      //clientsEachMonth.push(Math.floor(Math.random() * 100))
    }
    console.log("Clientes por mes: ",clientsEachMonth)

    this.chartOptions = {
      series: [
        {
          name: "Clientes novos",
          data: clientsEachMonth
        }
      ],
      chart: {
        height: 280,
        type: "area",
        width: "100%",
      },
      title: {
        text: "Clientes novos por mês"
      },
      xaxis: {
        categories: labels
      }
    };
  }
  createChartOld(){
    const labels = [];
    const date = new Date();
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
      labels.push(capitalizedMonth);
    }

    let clientsEachMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < 12; i++) {
      this.clientesData.forEach((element: any) => {
        const date = new Date(element.created_at);
        const nowYear = new Date().getFullYear();
        if (date.getMonth() == i && date.getFullYear() == nowYear) {
          clientsEachMonth[i] = clientsEachMonth[i] + 1
        }
      });
      //clientsEachMonth.push(Math.floor(Math.random() * 100))
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Novos Clientes',
          data: clientsEachMonth,
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
