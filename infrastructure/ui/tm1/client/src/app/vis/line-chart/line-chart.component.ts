import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { DataView, ChartType, ChartJSYAxisData } from '../chartSpecification';
import { VisService } from '../vis.service'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  myChart:Chart = []
  @Input() chartView: DataView;
  constructor(private visService: VisService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartView'].previousValue != undefined){
      this.createChart()
    }
  }

  createChart() {

    let datasets:Array<ChartJSYAxisData> = this.visService.getDatasets(this.chartView.data)
    let uniqueYears:Array<string> = this.visService.getYearLabels(this.chartView.data)
    
    var data:{labels:Array<string>, datasets:Array<ChartJSYAxisData>} = {
      labels:uniqueYears,
      datasets: datasets
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
