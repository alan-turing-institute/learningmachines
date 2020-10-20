import { Injectable } from '@angular/core';
import { YearSelection, dataPurpose } from './data';
import { DataView} from '../../vis/chartSpecification';

@Injectable({
  providedIn: 'root'
})
export class DataEngineerService {

  yearsSelection:Array<YearSelection>
  descriptiveStatistics:Array<DataView>
  performance:DataView

  constructor() { 
    this.setYears();
    this.setPerformanceData();
    this.setDescriptiveStatistics();
  }

  setYears():void{
    this.yearsSelection = []
    for (let y = 1992; y <=2017; y++)
    {
      this.yearsSelection.push({value: y.toString(), 
        purpose: 'unseen', 
        icon: 'circle',
        numberOfRows: Math.round(Math.random()*100)}
      )
    }
  }

  setPerformanceData(): void {
    this.performance = {
      id: "performanceVis", 
      vis: "line",
      sizeClass:"fixedSize", 
      title: "Model Performance",
      data: [{x:'V.0', y:80}, 
      {x:'2003', y:77}, 
      {x:'2004', y:60},
      {x:'2005', y:55},
      {x:'V.1', y:81},
      {x:'2006', y:79},
    ]}
  }

  setDescriptiveStatistics(): void {
    this.descriptiveStatistics = [
      { id: "numCases", 
        sizeClass: "autoSize",
        vis: "bar", 
        title: "Dataset Size",
        data: []
      },
      {id: "numCases1", 
      sizeClass: "autoSize",
      vis: "bar", 
        title: "Dataset Size",
        data: []
      }
    ]
    this.descriptiveStatistics = this.descriptiveStatistics.map(function(element){
      for (let y = 1992; y <=2017; y++)
        element.data.push({x:y.toString(), y:Math.round(Math.random()*1000)})
      return element
    })
  }

  getYears():Array<YearSelection>{
    return this.yearsSelection
  }

  toggleYearPurpose(selectedYear:string, purpose: dataPurpose): void {
    this.yearsSelection = this.yearsSelection.map(function(element, index, array){
      if (element.value == selectedYear){
        if (element.purpose == 'unseen') {
          element.purpose = purpose
          element.icon = 'success-standard'
        }
        else if (element.purpose == purpose) {
          element.purpose = 'unseen'
          element.icon = 'circle'
        }
      }
      return element
    })
  }
 
  getPerformanceData(): DataView {
    return this.performance
  }

  getDescriptiveStatistics():Array<DataView> {
    return this.descriptiveStatistics
  }

  getFilteredDescriptiveStatistics(years:Array<string>):Array<DataView>  {
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
        return (years.includes(element.x))
      })
      filteredByYear.push(aStat)
    }
    return filteredByYear
  }
}
