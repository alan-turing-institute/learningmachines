import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import { Chart } from 'chart.js';
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  chart:Chart = [];
  constructor() { }

  ngOnInit(): void {
  }
  
  createChart() {
    
    function randomValues(count, min, max) {
      const delta = max - min;
      let result = Array.from({length: count}).map(() => Math.random() * delta + min);
      return result
    }

    let predictionData = {
      labels: ['3 months', '6 months', '9 Months'],
      datasets: [{
        label: 'Prediction',
        backgroundColor: 'rgba(255,0,0,0.5)',
        borderColor: 'red',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: [
          randomValues(10,20,80),
          randomValues(10,0,50),
        ]
      }]
    };
    
    this.chart = new Chart('prediction', {
      type: 'boxplot',
      data: predictionData,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Probability of Relapse'},
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Probability'},
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
              stepSize:20 }
          }]
        }
      }
    });
  }

  ngAfterViewInit():void {
    this.createChart()
  }
}
