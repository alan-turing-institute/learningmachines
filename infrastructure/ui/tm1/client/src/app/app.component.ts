import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataView } from './vis/chartSpecification';

import { YearSelection, dataPurpose, dataAccessMode } from './perspectives/data-engineer/data'
import { DataEngineerService} from './perspectives/data-engineer/data-engineer.service'
type progressStatusOptions = "Complete" | "In Progress" | ""

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  constructor(private dataService: DataEngineerService) {
  }

  trainingProgressStatus: progressStatusOptions
  mode: dataPurpose | 'evaluate'
  performance:DataView
  years: Array<YearSelection>
  dataAccess: dataAccessMode = 'online'
  title = 'Learning Machines Demo V1 - Prognosis Classification with SEER';
  
  // showPredictions():Boolean {return false}
  
  ngOnInit():void {
    this.trainingProgressStatus = ""
    this.mode = 'train'
    this.years = []
    this.performance = null
    this.dataService.setYears(this.dataAccess)
      .subscribe((years:Array<YearSelection>) => {
        this.years = years
        this.dataService.setDescriptiveStatistics(this.dataAccess)
          .subscribe((statistics) => {
            console.log(statistics)
          })
      })
    this.printPredictions()
    // this.performance = this.dataService.getPerformanceData()
  }

  updateMode(mode: dataPurpose | 'evaluate'): void {
    this.mode = mode
    if (this.mode == "train") {
      this.trainingProgressStatus = ""
      let testYears:Array<YearSelection> = this.years.filter((year:YearSelection)=>{
        return year.purpose == 'test'
      })
      testYears.map((year:YearSelection)=>{
        console.log("toggling: %s", year.value)
        this.dataService.toggleYearPurpose(year.value, 'train')
      })
      this.years = this.dataService.getYears();
    }

    if (this.mode == 'test') {
      this.trainingProgressStatus = "Complete"
    }

    if (this.mode == 'evaluate'){
      this.trainingProgressStatus = "Complete"
      this.printPredictions();
    }
  }

  updateYearSelection():void {
    this.years = this.dataService.getYears()
  }

  printPredictions():void {
    this.dataService.getPerformanceDataManual()
      .subscribe(performance=>{
        this.performance = performance
      })
  }

}


