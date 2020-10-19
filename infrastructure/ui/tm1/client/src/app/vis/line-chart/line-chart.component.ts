import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DataView, ChartType } from '../chartSpecification';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  myChart:Chart = []
  @Input() chartView: DataView;

  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    var data = {
      labels: this.chartView.data.map(function(e){
        return e.x
      }),
      datasets: [{
        label: "Specificity",
        data: this.chartView.data.map(function(e){
          return e.y
        }),
      }]
    };
     
    var chartOptions = {
      maintainAspectRatio: (this.chartView.sizeClass=="fixedSize"?false:true),
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      }
    };
    
    this.myChart = new Chart(this.chartView.id, {
      type: 'line',
      data: data,
      options: chartOptions
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      this.createChart()
    }, 300)
  }

}
