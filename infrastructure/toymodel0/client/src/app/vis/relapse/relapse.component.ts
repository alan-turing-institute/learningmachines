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
          datasets: [{
              label: 'Relapse',
              data: [null, 50, null, null],
              spanGaps: true
          }]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'category',
                  position: 'bottom',
                  labels: ['Baseline', '3 months', '6 months', '9 months'],
              }]
          }
      }
  });
    
    // this.chart = new Chart('relapse', {
    //   type: 'scatter',
    //   data: {
    //     labels: ['Baseline', '3 months', '6 months', '9 months'],
    //     datasets:[{
    //       label: "Relapse",
    //       data: [{x: '3 months', y: 3},
    //         {x: '6 months', y: 3},
    //         {x: '9 months', y: 5}
    //       ]
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes:[{
    //         ticks: {
    //           display:false
    //         },
    //         scaleLabel: {
    //           display: true,
    //           labelString: "Occurence"
    //         }}
    //       ]
    //     },
    //     xAxes: [{
    //       type: {
    //         display: true,
    //         labelString: 'time'
    //       }
    //     }],
    //   }
    // });
  }

  ngAfterViewInit():void {
    this.createChart()
  }
}
