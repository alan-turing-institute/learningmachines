import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-edss',
  templateUrl: './edss.component.html',
  styleUrls: ['./edss.component.css']
})

export class EdssComponent implements OnInit {
  chart:Chart = [];
  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    this.chart = new Chart('edss', {
      type: 'line',
      data: {
        labels: ['Baseline', '3 months', '6 months', '9 months'],
        datasets: [{
            label: 'EDSS',
            data: [4, 3, 2],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'score'
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 10
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'time'
            }
          }]
        }
      }
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      this.createChart()
    }, 300)
    
  }
}
