import { Cliente } from '../../models/cliente';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Utils from "chart.js/auto"
import { ServidoresService } from '../servidores/services/servidores.service';
import { Servidor } from 'src/app/models/servidor';
import { Observable } from 'rxjs';
import { ClientesService } from '../clientes/services/clientes.service';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

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
  clientesData: Cliente[] = [];

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
      this.clientesData = data
      this.createChart();
    })

  }

  createChartv2(){
    let root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // Generate random data
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;
    let previousValue = value;
    let downColor = root.interfaceColors.get("negative");
    let upColor = root.interfaceColors.get("positive");
    let color;
    let previousColor;
    let previousDataObj;
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

    console.log("CientesEachMonth: ", this.clientesData)
    for (let i = 0; i < 12; i++) {
      this.clientesData.forEach((element: any) => {
        const date = new Date(element.created_at);
        const nowYear = new Date().getFullYear();
        console.log(date.getMonth(), i, date.getFullYear(), nowYear)
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
