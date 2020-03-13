import { Chart } from 'chart.js';import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relapse',
  templateUrl: './relapse.component.html',
  styleUrls: ['./relapse.component.css']
})
export class RelapseComponent implements OnInit {
  chart:Chart = [];
  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    

    
    this.chart = new Chart('relapse', {
      type: 'scatter',
      data: {
        labels: ['3 months', '6 months', '9 months'],
        datasets:[{
          label: "Relapse",
          data: [1, 2, 3]
        }]
      },
      options: {
        scales: {
          yAxes:[{
            ticks: {
              display:false
            },
            scaleLabel: {
              display: true,
              labelString: "Occurence"
            }}
          ]
        },
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'time'
          }
        }],
      }
    });
  }

  ngAfterViewInit():void {
    this.createChart()
  }
}
