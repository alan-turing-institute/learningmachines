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
    let probabilityData = {
        label: 'Probability',
        data: [null,50,70,80],
        yAxisID: 'probability',
      }
    
    let uncertaintyData = {
      label: 'Uncertainty',
      backgroundColor: 'rgba(255,0,0,0.5)',
      borderColor: 'red',
      borderWidth: 1,
      data: [null, 50, 80, 75],
      spanGaps: true,
      yAxisID: 'uncertainty',
    }
    
    this.chart = new Chart('relapse', {
      type: 'scatter',
      data: {
          datasets: [probabilityData, uncertaintyData]
      },
      options: {
        title: {
          display: true,
          text: 'Probability/Uncertainty of relapse within 3 months'},
        scales: {
          xAxes: [{
            type: 'category',
            position: 'bottom',
            labels: ['Baseline', '3 months', '6 months', '9 months'],
          }],
          yAxes:[{
            id: 'probability',
            position: 'left',
            ticks: {
              display:false,
              suggestedMax: 100,
              stepSize:50 
            },
            scaleLabel: {
              display: true,
              labelString: "Probability"
            }
          },
          {
            id: 'uncertainty',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Uncertainty'},
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
