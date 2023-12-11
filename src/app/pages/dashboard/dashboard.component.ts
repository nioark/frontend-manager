import { Cliente } from '../../models/cliente';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServidoresService } from '../servidores/services/servidores.service';
import { Servidor } from 'src/app/models/servidor';
import { Observable } from 'rxjs';
import { ClientesService } from '../clientes/services/clientes.service';
import { Row } from 'angular-google-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements AfterViewInit {
  options : google.visualization.LineChartOptions | undefined
  dataTable : google.visualization.DataTable | undefined;
  dataView : google.visualization.DataView | undefined
  chart: google.visualization.LineChart | undefined;
  servidores$?: Observable<Servidor[] | undefined>

  serverCount: number = 0;
  serversAtivo: number = 0;
  serversInativo: number = 0;
  clienteCount: number = 0;
  clientesData: Cliente[] = [];


  constructor(private _servidoresSrv: ServidoresService, private _clientesSrv: ClientesService) {
  }

  ngAfterViewInit(): void {
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

  onResize(event : any) {
    this.chart?.draw(this.dataView as any, this.options as any);
  }

  createChart(){
    const labels: any[] | undefined = [];
    const date = new Date();
    for (let i = 0; i < 12; i++) {
      date.setMonth(i);
      const month = date.toLocaleString('pt-BR', { month: 'short' });
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

    this.dataTable = new google.visualization.DataTable()
    this.dataTable.addColumn('string', 'Mês');
    this.dataTable.addColumn('number', 'Novos Clientes');

    var data = clientsEachMonth.forEach((element: any, index: any) => {
      this.dataTable?.addRow([labels[index], element])
    });

    this.dataView = new google.visualization.DataView(this.dataTable);
     this.dataView .setColumns([0, 1, {
      calc: "stringify",
      sourceColumn: 1,
      type: "string",
      role: "annotation"
  },]);

    this.chart = new google.visualization.AreaChart(document.getElementById('chart') as Element);

    const maxValue = Math.max(...clientsEachMonth)
    const ticks = [];

    for (let i = 0; i <= maxValue; i++) {
      ticks.push(i);
    }

    this.options  = {
      title: 'Clientes de cada mês',
      colors: ['#192ae1', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      vAxis: {
        ticks: ticks // Set the desired tick values
      },
      chartArea: {width: '90%', height: '60%'},
      legend: { position: 'bottom' },
      pointSize: 5,


    };

    this.chart.draw( this.dataView , this.options as any);
  }

}
