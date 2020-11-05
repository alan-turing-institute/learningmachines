import { Injectable } from '@angular/core';
import { YearSelection, dataPurpose } from './data';
import { DataView, AxisData} from '../../vis/chartSpecification';

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

    function getDate(year:number):Date{
      let newDate = new Date()
      newDate.setFullYear(year)
      return newDate
    }

    for (let y = 1992; y <=2017; y++)
    {
      this.yearsSelection.push({value: getDate(y), 
        purpose: 'unseen', 
        icon: 'circle',
        numberOfRows: Math.round(Math.random()*100),
        valueAsSortable: (value):number=> { 
          return value.getFullYear()
        }
      })
    }
    // console.log(JSON.stringify(this.yearsSelection))
  }

  setPerformanceData(): void {
    this.performance = {
      id: "performanceVis", 
      vis: "line",
      sizeClass:"fixedSize", 
      title: "Model Performance",
      data: [{x:'V.0', y:80}]
    }
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
    // console.log(JSON.stringify(this.descriptiveStatistics))
  }

  getYears():Array<YearSelection>{
    return this.yearsSelection
  }

  toggleYearPurpose(selectedYear:Date, purpose: dataPurpose): void {
    this.yearsSelection = this.yearsSelection.map(function(element, index, array){
      if (element.value.getFullYear() == selectedYear.getFullYear()){
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
    let yearsToShowPerformanceValues:Array<YearSelection> = this.yearsSelection.filter((y)=>{
      return ((y.purpose == 'test') || (y.purpose == 'train'))
    })

    let yearsWithPerformanceValues:Array<String> = this.performance.data.map((axisData)=>{
        return axisData.x
    })

    let newPerformanceData:Array<AxisData> = yearsToShowPerformanceValues.map((yearSelection)=>{
      if (yearsWithPerformanceValues.includes(yearSelection.valueAsSortable.toString())){
        return 
      }
      else {
        let yearAsLabel:string = yearSelection.valueAsSortable(yearSelection.value).toString()
        console.log(yearAsLabel)
        let newPerformanceData:AxisData = {x:yearAsLabel, y: Math.random()*100}
        return newPerformanceData
      }
    })
    
    this.performance = {...this.performance, data:this.performance.data.concat(newPerformanceData)}
    return this.performance
  }

  getDescriptiveStatistics():Array<DataView> {
    return this.descriptiveStatistics
  }

  getFilteredDescriptiveStatistics(selectedDates:Array<Date>):Array<DataView>  {
    let filteredByYear:Array<DataView>=[]
    let selectedYears:Array<string> = selectedDates.map(function(d){
      return d.getFullYear().toString();
    })
    for (let s = 0; s < this.descriptiveStatistics.length; s++) {
      let aStat:DataView = {
        id: this.descriptiveStatistics[s].id,
        sizeClass: this.descriptiveStatistics[s].sizeClass,
        vis: this.descriptiveStatistics[s].vis,
        title: this.descriptiveStatistics[s].title,
        data: []
      }
      aStat.data = this.descriptiveStatistics[s].data.filter(function(element){
        return (selectedYears.includes(element.x))
      })
      filteredByYear.push(aStat)
    }
    return filteredByYear
  }
}
