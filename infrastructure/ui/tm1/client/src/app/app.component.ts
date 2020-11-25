import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataView } from './vis/chartSpecification';

import { YearSelection, dataPurpose } from './perspectives/data-engineer/data'
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

  trainingProgress: progressStatusOptions
  mode: dataPurpose | 'evaluate'
  showView: 'Engineer' | 'Patient'
  performance:DataView
  years: Array<YearSelection>
  title = 'Learning Machines Demo V1 - Prognosis Classification with SEER';
  
  showPredictions():Boolean {return false}
  
  ngOnInit():void {
    this.trainingProgress = ""
    this.mode = 'train'
    this.years = []
    this.performance = null
    // this.dataService.setYears()
    //   .subscribe((data:Array<YearSelection>) => {
    //     this.years = data
    //     this.dataService.initDescriptiveStatisticsData()
    //   })
    this.years = this.dataService.setYearsManual()
    this.dataService.initDescriptiveStatisticsData()
    this.performance = this.dataService.getPerformanceData()
  }

  updateMode(mode: dataPurpose | 'evaluate'): void {
    this.mode = mode
    if (this.mode == "train") {
      this.trainingProgress = ""
      let testYears:Array<YearSelection> = this.years.filter((year:YearSelection)=>{
        return year.purpose == 'test'
      })
      testYears.map((year:YearSelection)=>{
        console.log("toggling: %s", year.value)
        this.dataService.toggleYearPurpose(year.value, 'train')
      })
      this.years = this.dataService.getYears();
      console.log(this.years)
      console.log(testYears)
    }

    if (this.mode == 'test') {
      this.trainingProgress = "Complete"
    }

    if (this.mode == 'evaluate'){
      this.trainingProgress = "Complete"
      this.printPredictions(true);
    }
  }

  updateYearSelection():void {
    this.years = this.dataService.getYears()
  }

  printPredictions(show:Boolean):void {
    this.performance=this.dataService.getPerformanceData()
  }

}


