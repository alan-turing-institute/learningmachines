import { Injectable } from '@angular/core';
import { YearSelection } from './data';
import { DataView} from '../../vis/chartSpecification';

@Injectable({
  providedIn: 'root'
})
export class DataEngineerService {

  yearsSelection:Array<YearSelection>
  descriptiveStatistics:Array<DataView>
  
  constructor() { 
    this.yearsSelection = []
    for (let y = 1992; y <=2017; y++)
    {
      this.yearsSelection.push({value: y.toString(), 
        purpose: 'unseen', 
        icon: 'circle',
        numberOfRows: Math.round(Math.random()*100)}
      )
    }

    this.descriptiveStatistics = [
      {id: "numCases", 
      sizeClass: "autoSize",
        vis: "bar", 
        title: "Dataset Size",
        data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases1", 
      sizeClass: "autoSize",
      vis: "bar", 
        title: "Dataset Size",
        data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases2", 
      sizeClass: "autoSize",
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases3", 
      sizeClass: "autoSize",
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      }
    ]
  }

  getYears():Array<YearSelection>{
    return this.yearsSelection
  }

  toggleTrainingYear(selectedYear:string): void {
    this.yearsSelection = this.yearsSelection.map(function(element, index, array){
      if (element.value == selectedYear){
        if (element.purpose == 'unseen') {
          element.purpose = 'train'
          element.icon = 'success-standard'
        }
        else if (element.purpose == 'train') {
          element.purpose = 'unseen'
          element.icon = 'circle'
        }
      }
      return element
    })
  }

  getPerformanceData(): DataView {
    let performance:DataView = {id: "performanceVis", 
        vis: "line",
        sizeClass:"fixedSize", 
        title: "Model Performance",
        data: [{x:'V.0', y:80}, 
          {x:'2003', y:77}, 
          {x:'2004', y:60},
          {x:'2005', y:55},
          {x:'V.1', y:81},
          {x:'2006', y:79},
        ]
      }
    return performance
  }

  getDescriptiveStatistics():Array<DataView> {
    return this.descriptiveStatistics
  }
  
  getFilteredDescriptiveStatistics(year:string):Array<DataView>  {
    let filteredByYear:Array<DataView>=[]
    for (let s = 0; s < this.descriptiveStatistics.length; s++) {
      let aStat:DataView = {
        id: this.descriptiveStatistics[s].id,
        sizeClass: this.descriptiveStatistics[s].sizeClass,
        vis: this.descriptiveStatistics[s].vis,
        title: this.descriptiveStatistics[s].title,
        data: []
      }
      aStat.data = this.descriptiveStatistics[s].data.filter(function(element){
        return (element.x==year)
      })
      filteredByYear.push(aStat)
    }
    console.log(filteredByYear)
    return filteredByYear
  }
}
