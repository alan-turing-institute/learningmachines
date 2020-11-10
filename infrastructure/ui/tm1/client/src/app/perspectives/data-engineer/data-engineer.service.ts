import { Injectable } from '@angular/core';
import { YearSelection, dataPurpose } from './data';
import { DataView, AxisData} from '../../vis/chartSpecification';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataEngineerService {

  yearsSelection:Array<YearSelection>
  descriptiveStatistics:Array<DataView>
  performance:DataView
  rootUrl: string

  constructor(private http: HttpClient) { 
    this.rootUrl = "http://13.80.18.73:8080"
    this.yearsSelection = []
    this.descriptiveStatistics = []
    this.performance={
      id: "performanceVis", 
      vis: "line",
      sizeClass:"fixedSize", 
      title: "Model Performance",
      data: []
    }
    this.setPerformanceDataManual();
  }

  setYears():Observable<YearSelection[]> {
    let url:URL=new URL("/diagnosedPerYear/", this.rootUrl)
    return this.http.get<YearSelection[]>(url.toString())
      .pipe(
        map((yearsCount:Array<any>) => 
          yearsCount.map(yearCount=>{
            let year:number = (yearCount as any).year
            let count:number = (yearCount as any).count
            let yearDate:Date = new Date()
            yearDate.setFullYear(year)
            let newYearSelection:YearSelection = { value: yearDate, 
              purpose: 'unseen', 
              icon: 'circle',
              numberOfRows: count,
              valueAsSortable: (value):number=> { 
                return value.getFullYear()
              }
            }
            this.yearsSelection.push(newYearSelection)
            return newYearSelection
          })
        )
      )
  }

  setYearsManual():void{
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
  }

  setPerformanceDataManual(): void {
    this.performance = {
      id: "performanceVis", 
      vis: "line",
      sizeClass:"fixedSize", 
      title: "Model Performance",
      data: []
    }
  }

  initDescriptiveStatisticsData(): void {
  
    let yearCountData:Array<AxisData>=[]
    this.yearsSelection.map((year:YearSelection)=>{
      let aYearCaseCount:AxisData = {
        perspective: [""],
        x:year.valueAsSortable(year.value).toString(),
        y:[year.numberOfRows]
      }
      yearCountData.push(aYearCaseCount)
    })

    let yearCountStatistics:DataView = { id: "yearCount",
        sizeClass: "autoSize",
        vis: "bar",
        title: "Total Case Count (by Year)",
        data: yearCountData
    }
    this.descriptiveStatistics.push(yearCountStatistics)

    // 1975Alive0.483944011975Breast Cancer0.3078427341975Other0.129271305
    let breakdown1975:AxisData = {
      perspective: ['Alive', 'Breast Cancer', 'Other', 'Disease Of Heart'],
      x:'1975',
      y:[Math.round(0.483944011975*100), Math.round(0.3078427341975*100), Math.round(0.129271305*100), Math.round(0.078941951*100)]
    }

    let breakdown1976:AxisData = {
      perspective: ['Alive', 'Breast Cancer', 'Other', 'Disease Of Heart'],
      x:'1976',
      y:[Math.round(0.472795891*100), Math.round(0.317433693*100), Math.round(0.128210504*100), Math.round(0.081559912*100)]
    }

    let caseBreakdownStatistics:DataView = { id: "proportionCases",
        sizeClass: "autoSize",
        vis: "bar",
        title: "Proportion of Cases (by Year)",
        data: [breakdown1975, breakdown1976]
    }

    this.descriptiveStatistics.push(caseBreakdownStatistics)

    console.log(this.descriptiveStatistics)
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

    let newDataPoints:Array<AxisData> = this.performance.data
    yearsToShowPerformanceValues.map((yearSelection)=>{
      if (!yearsWithPerformanceValues.includes(yearSelection.valueAsSortable(yearSelection.value).toString())){
        let yearAsLabel:string = yearSelection.valueAsSortable(yearSelection.value).toString()
        let newPerformanceData:AxisData = {perspective:[""], x:yearAsLabel, y: [Math.random()*100]}
        newDataPoints.push(newPerformanceData)
      }
    })
    // console.log(newDataPoints)
    this.performance = {...this.performance, data:newDataPoints}
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
