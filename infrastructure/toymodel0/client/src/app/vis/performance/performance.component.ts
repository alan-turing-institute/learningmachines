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
                display: true,
                lineWidth: 0.5,
            color: 'rgba(128, 128, 128, 0.2)'
            },
            pointLabels: {
              fontSize: 14,
              fontStyle: '300',
              fontColor: 'rgba(204, 204, 204, 1)',
              fontFamily: "'Lato', sans-serif"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 100
            }
        }
    };

    let performanceData: {
      labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
      datasets: [{
          backgroundColor: 'rgb(0, 200, 132)',
                borderColor: 'rgb(0, 200, 132)',
          data: [20, 10, 4, 2]
      }]
    }

    this.performance = new Chart('performance', {
      type: 'radar',
      data: {
        labels: ["True Positive", "False Negative", "True Negative", "False Positive"],
        datasets: [{
          label:  '500 patients',
          // backgroundColor: 'rgb(200, 200, 132)',
          // borderColor: 'rgb(0, 200, 132)',
          data: [100, 100, 100, 200],
        },{
          label: '1000 patients',
          backgroundColor: 'rgb(0, 200, 132)',
          borderColor: 'rgb(0, 200, 132)',
          data: [1000, 0, 1000, 400],
      }]
    },
      
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      this.createPerformance()
    }, 300)
  }

}
