import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DataView, AxisData, OutcomeCategories } from '../chartSpecification';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  myChart:Chart = []
  @Input() chartView: DataView;
  pallette: Array<string>= ['#DEEAEE', '#B1CBBB', '#EEA29A', '#C94C4C']
  constructor() { }

  ngOnInit(): void {
  }

  createChart() {
    console.log(this.chartView)
    let perspectives:OutcomeCategories[] = [].concat(...this.chartView.data.map((data:AxisData)=>{return data.perspective}))
    console.log(perspectives)
    let uniquePerspectives:OutcomeCategories[] = [...new Set(perspectives)];
    console.log(uniquePerspectives)
    let datasets:Array<{label:string, data:Array<number>}> = []

    uniquePerspectives.map((p:OutcomeCategories, index)=>{
      let dataOfPerspective:Array<number> = this.chartView.data.map((data:AxisData)=>{
        let indexOfPerspective:number = data.perspective.indexOf(p)
        if (indexOfPerspective > -1)
          return data.y[indexOfPerspective]
      })
      let dataset:{label: string, data: Array<number>, backgroundColor: string} = {
        label: p,
        data: dataOfPerspective,
        backgroundColor: this.pallette[index]
      };
      datasets.push(dataset)
    })

    let years:Array<string> = this.chartView.data.map((data:AxisData)=>{
      return data.x
    })

    let uniqueYears:Array<string> = [...new Set(years)];
    
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
