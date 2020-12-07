import { Injectable } from '@angular/core';
import { YearSelection, dataPurpose, dataAccessMode, Incidences } from './data';
import { DataView, AxisData} from '../../vis/chartSpecification';
import {caseBreakdownStatistics, yearIncidences, performanceStatistics} from './descriptionStatisticsData'
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
    this.rootUrl = new URL("http://13.80.18.73:80")
    this.yearsSelection = []
    this.descriptiveStatistics = []
    this.performance={
      id: "performanceVis", 
      vis: "line",
      sizeClass:"fixedSize", 
      title: "Model Performance",
      data: []
    }
  }

  getYears():Array<YearSelection>{
    return this.yearsSelection
  }

  setYears(dataAccess:dataAccessMode):Observable<YearSelection[]>{
    if (dataAccess=='online')
      return this.setYearsAPI()
    else  
      return this.setYearsManual()
  }

  setYearsAPI():Observable<YearSelection[]> {
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

  setYearsManual():Observable<YearSelection[]>{
    this.yearsSelection = []

    function getDate(year:number):Date{
      let newDate = new Date()
      newDate.setFullYear(year)
      return newDate
    }
    let incidences:Array<Incidences> = yearIncidences
    
    let obsUsingConstructor = Observable.create( observer => {
      for (let y = 0; y < incidences.length; y++) {
        let yearSelection:YearSelection = { value: getDate(incidences[y].year), 
          purpose: 'unseen', 
          icon: 'circle',
          numberOfRows: incidences[y].numCases,
          valueAsSortable: (value):number=> { 
            return value.getFullYear()
          }
        }
        this.yearsSelection.push(yearSelection)
      }
      observer.next(this.yearsSelection)
      observer.complete()
    })
    return obsUsingConstructor  
  }

  setDescriptiveStatistics(dataAccess: dataAccessMode): Observable<DataView[]> {
    if (dataAccess=='online')
      return this.setDescriptiveStatisticsAPI()
    else
      return this.setDescriptiveStatisticsManual()
  }

  setDescriptiveStatisticsAPI():Observable<DataView[]> {
    let caseBreakdownDataView:DataView = { id: "proportionCases",
    sizeClass: "autoSize",
    vis: "bar",
    title: "Proportion of Cases (by Year)",
    data: caseBreakdownStatistics
    }
    this.descriptiveStatistics.push(caseBreakdownDataView)

    let obsUsingConstructor:Observable<DataView[]> = Observable.create(observer =>{
      observer.next(caseBreakdownDataView)
      observer.complete()
    })
    return obsUsingConstructor
  }

  setDescriptiveStatisticsManual():Observable<DataView[]> {
    let caseBreakdownDataView:DataView = { id: "proportionCases",
        sizeClass: "autoSize",
        vis: "bar",
        title: "Proportion of Cases (by Year)",
        data: caseBreakdownStatistics
    }
    this.descriptiveStatistics.push(caseBreakdownDataView)

    let obsUsingConstructor:Observable<DataView[]> = Observable.create(observer =>{
      observer.next(caseBreakdownDataView)
      observer.complete()
    })
    return obsUsingConstructor
  }

  toggleYearPurpose(selectedYear:Date, purpose: dataPurpose): void {
    // console.log("Toggle year: %s", JSON.stringify(selectedYear))
    this.yearsSelection = this.yearsSelection.map(function(element, index, array){
      if (element.value.getFullYear() == selectedYear.getFullYear()){
        // this sets unseen to test/train
        if (element.purpose == 'unseen') {
          element.purpose = purpose
          element.icon = 'success-standard'
        }
        // this sets train/test to unseen
        else if (element.purpose == purpose) {
          element.purpose = 'unseen'
          element.icon = 'circle'
        }
        // this sets test data to training data
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
 
  getPerformanceDataManual(): Observable<DataView> {
    let yearsToShowPerformanceValues:Array<YearSelection> = this.yearsSelection.filter((y)=>{
      return ((y.purpose == 'test') || (y.purpose == 'train'))
    })

    let yearsWithPerformanceValues:Array<String> = this.performance.data.map((axisData)=>{
        return axisData.x
    })

  
    let obsUsingConstructor: Observable<DataView> = Observable.create(observer=>{
      let newDataPoints:Array<AxisData>= performanceStatistics
      this.performance = {...this.performance, data:newDataPoints}
      observer.next(this.performance)
      observer.complete()
    })
    return obsUsingConstructor
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
