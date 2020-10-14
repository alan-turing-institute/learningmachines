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
    var densityData = {
      label: 'Density of Planets (kg/m3)',
      data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638]
    };
    this.myChart = new Chart(this.chartView.id, {
      type: 'bar',
      data: {
        labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
        datasets: [densityData]},
      options: {
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
      }
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      console.log(this.chartView.id)
      this.createChart()
    }, 300)
  }

}
