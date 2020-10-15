import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

type ChartType = "bar" | "line"
interface DataView {
  id: string
  vis: ChartType
  title: string
  data: Array<{x:string, y:number}>
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  myChart:Chart = []
  @Input() chartView: DataView;
  
  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    var dataset = {
      label: this.chartView.title,
      data: this.chartView.data.map(function(e){
        return e.y
      })
    };
    
    this.myChart = new Chart(this.chartView.id, {
      type: 'bar',
      data: {
        labels: this.chartView.data.map(function(e){
          return e.x
        }),
        barThickness: 'flex',
        datasets: [dataset]
      },
      // options: {
      //   scales: {
      //       xAxes: [{
      //           gridLines: {
      //               offsetGridLines: true
      //           }
      //       }]
      //   }
      // }
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      console.log(this.chartView.id)
      this.createChart()
    }, 300)
  }

}