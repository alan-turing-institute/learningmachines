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
    
  //   let predictionData = {
  //     label: 'Prediction',
  //     data:[{x: 3, y: 1, r: 3},
  //         {x: 6, y: 1, r: 3},
  //         {x: 9, y: 1, r: 3}]  
  //   };

  // let options = {
  //       title: {
  //         display: false,
  //         text: 'Probability/Occurence of Relapse'},
  //       scales: {
  //         xAxes: [{
  //           type: 'category',
  //           position: 'bottom',
  //           labels: ['Baseline', '3 months', '6 months', '9 months'],
  //         }],
  //         yAxes:[{
  //           id: 'occurence',
  //           position: 'left',
  //           ticks: {
  //             display:false,
  //             suggestedMax: 2,
  //             stepSize:1 
  //           },
  //           scaleLabel: {
  //             display: true,
  //             labelString: "Occurence"
  //           }
  //         }]
  //       }
  //     }

    this.chart = new Chart('prediction', {
      type: 'bubble',
      data: {
        datasets: [{
          label: ["Probability"],
          data: [{ x: '3', y: 1, r: 9}, 
            { x: '6', y: 1, r: 3},
            { x: '9', y: 1, r: 12}]
        },
          { 
            label: ["Occurence"],
            backgroundColor: 'rgba(255,0,0,0.5)',
            borderColor: 'red',
            spanGaps: true,
            data: [{ x: '3', y: 1, r: 3}]
          }
          ] 
        
      },
      options: {
        title: {
          display: false,
          text: 'Probability/Occurence of Relapse within 3 months'
        }, scales: {
          yAxes: [{ 
            ticks: {
              display:false,
              beginAtZero: true,
              suggestedMax: 2,
              stepSize:1
            },
            scaleLabel: {
              display: true,
              labelString: "Prediction/Occurence"
            }
          }],
          xAxes: [{ 
            // type: 'category',
            ticks: {
              display:true,
              beginAtZero: true,
              suggestedMax: 9,
              stepSize:3 
            },
            scaleLabel: {
              display: true,
              labelString: "Time (months)"
            }
          }]
        }
      }
  });
  }
  
  ngAfterViewInit():void {
    setTimeout(()=> {this.createChart()}, 300)
  }

  createBoxPlot() {
    
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

}
