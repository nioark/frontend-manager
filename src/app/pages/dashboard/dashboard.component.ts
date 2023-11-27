import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Utils from "chart.js/auto"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart: any;

  constructor() { }

  ngOnInit(): void {
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

    // this.chart = new Chart("MyChart", {
    //   type: 'bar', //this denotes tha type of chart

    //   data: {// values on X-Axis
    //     labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
		// 						 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
	  //      datasets: [
    //       {
    //         label: "Sales",
    //         data: ['467','576', '572', '79', '92',
		// 						 '574', '573', '576'],
    //         backgroundColor: 'blue'
    //       },
    //       {
    //         label: "Profit",
    //         data: ['542', '542', '536', '327', '17',
		// 							 '0.00', '538', '541'],
    //         backgroundColor: 'limegreen'
    //       }
    //     ]
    //   },
    //   options: {
    //     aspectRatio:2.5
    //   }

    // });
  }

}
