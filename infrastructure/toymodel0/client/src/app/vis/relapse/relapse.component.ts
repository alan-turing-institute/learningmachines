import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-relapse',
  templateUrl: './relapse.component.html',
  styleUrls: ['./relapse.component.css']
})

export class RelapseComponent implements OnInit {
  chart:Chart = []
  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    let predictionData = {
        label: 'Prediction',
        data: [null,50,20,null],
        yAxisID: 'probability',
      }
    
    let relapseData = {
      label: 'Occurence',
      backgroundColor: 'rgba(255,0,0,0.5)',
      borderColor: 'red',
      borderWidth: 1,
      data: [null, 100, 100, null],
      spanGaps: true,
      yAxisID: 'occurence',
    }
    
    this.chart = new Chart('relapse', {
      type: 'scatter',
      data: {
          datasets: [relapseData, predictionData]
      },
      options: {
        title: {
          display: true,
          text: 'Probability/Occurence of Relapse'},
        scales: {
          xAxes: [{
            type: 'category',
            position: 'bottom',
            labels: ['Baseline', '3 months', '6 months', '9 months'],
          }],
          yAxes:[{
            id: 'occurence',
            position: 'right',
            ticks: {
              display:false,
              suggestedMax: 100,
              stepSize:50 
            },
            scaleLabel: {
              display: true,
              labelString: "Occurence"
            }
          },
          {
            id: 'probability',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Probability'},
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
              stepSize:50 }
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
