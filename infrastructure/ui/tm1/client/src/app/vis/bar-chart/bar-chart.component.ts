import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DataView, AxisData, OutcomeCategories, ChartJSYAxisData } from '../chartSpecification';
import { VisService } from '../vis.service'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  myChart:Chart = []
  @Input() chartView: DataView;
  pallette: Array<string>= ['#DEEAEE', '#B1CBBB', '#EEA29A', '#C94C4C']
  constructor(private visService: VisService) { }

  ngOnInit(): void {
  }

  createChart() {
    let datasets:Array<ChartJSYAxisData> = this.visService.getDatasets(this.chartView.data)
    let uniqueYears:Array<string> = this.visService.getYearLabels(this.chartView.data)
    
    this.myChart = new Chart(this.chartView.id, {
      type: 'bar',
      data: {
        labels: uniqueYears,
        barThickness: 'flex',
        datasets: datasets
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true, 
              gridLines: { display: false },
          }],
          yAxes: [{ 
            stacked: true, 
          }],
        }
      }
    });
  }

  ngAfterViewInit():void {
    setTimeout(()=>{
      this.createChart()
    }, 100)
  }

}
