import { Injectable } from '@angular/core';
import { YearSelection, dataPurpose } from './data';
import { DataView, AxisData} from '../../vis/chartSpecification';
import {caseBreakdownStatistics} from './descriptionStatisticsData'
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
  rootUrl: URL

  constructor(private http: HttpClient) { 
    this.rootUrl = new URL("http://13.80.18.73:8080")
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

  setYearsManual():Array<YearSelection>{
    this.yearsSelection = []
    function getDate(year:number):Date{
      let newDate = new Date()
      newDate.setFullYear(year)
      return newDate
    }

    for (let y = 1975; y <=2017; y++)
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

    return this.yearsSelection
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
        perspective: ["Number of Cases"],
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

    let caseBreakdownDataView:DataView = { id: "proportionCases",
        sizeClass: "autoSize",
        vis: "bar",
        title: "Proportion of Cases (by Year)",
        data: caseBreakdownStatistics
    }

    this.descriptiveStatistics.push(caseBreakdownDataView)
  }

  getYears():Array<YearSelection>{
    return this.yearsSelection
  }

  toggleYearPurpose(selectedYear:Date, purpose: dataPurpose): void {
    // console.log("Toggle year: %s", JSON.stringify(selectedYear))
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
        else if (element.purpose == 'test'){
          element.purpose = purpose
        }
      }
      return element
    })
  }

  getYearPurpose(selectedYear:Date): dataPurpose {
    let yearSelection: Array<YearSelection> = this.yearsSelection.filter(function(element){
      if (element.value.getFullYear() == selectedYear.getFullYear()){
        return element
      }
    })
    
    if (yearSelection.length == 1)
      return yearSelection[0].purpose
    else
      return 'unseen'
  }
 
  getPerformanceData(): DataView {
    let yearsToShowPerformanceValues:Array<YearSelection> = this.yearsSelection.filter((y)=>{
      return ((y.purpose == 'test') || (y.purpose == 'train'))
    })

    let yearsWithPerformanceValues:Array<String> = this.performance.data.map((axisData)=>{
        return axisData.x
    })

    // let newDataPoints:Array<AxisData> = this.performance.data
    // yearsToShowPerformanceValues.map((yearSelection)=>{
    //   if (!yearsWithPerformanceValues.includes(yearSelection.valueAsSortable(yearSelection.value).toString())){
    //     let yearAsLabel:string = yearSelection.valueAsSortable(yearSelection.value).toString()
    //     let newPerformanceData:AxisData = {perspective:['Sensitivity', 'Specificity'], x:yearAsLabel, y: [Math.random()*100, Math.random()*100]}
    //     newDataPoints.push(newPerformanceData)
    //   }
    // })

    let newDataPoints:Array<AxisData>= [{
      "perspective": ["V_1979"],
      "x": "1980-1984",
      "y": [80]
    },
    {
      "perspective": ["V_1979", "V_1984"],
      "x": "1985-1989",
      "y": [70, 80]
    },
    {
      "perspective": ["V_1979", "V_1984", "V_1989"],
      "x": "1990-1994",
      "y": [60, 70, 80]
    },
    {
      "perspective": ["V_1979", "V_1984", "V_1989", "V_1994"],
      "x": "1995-1999",
      "y": [60, 60, 80, 90]
    }
    ]
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
