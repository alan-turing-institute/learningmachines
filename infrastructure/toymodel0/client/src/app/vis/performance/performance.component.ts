import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  performance:Chart = []
  sensitivity:Chart = []

  constructor() { }

  ngOnInit(): void {
  }

  createPerformance() {
      let options = {
        scale: {
            angleLines: {
                display: false,
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax:100,
              stepSize: 50
            }
        }
    };

    let performanceData = {
      labels: ["True Positive", "False Negative", "True Negative", "False Positive"],
      datasets: [{
        label:  '500 patients',
        data: [25, 25, 25, 25],
      },{
        label: '1000 patients',
        backgroundColor: 'rgba(0, 255, 132, 0.5)',
        borderColor: 'rgb(0, 200, 132)',
        data: [40, 10, 40, 10],
    }]
  }

    this.performance = new Chart('performance', {
      type: 'radar',
      data: performanceData,
      options: options
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      this.createPerformance()
    }, 300)
  }

}
