import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataView } from './vis/chartSpecification';

import { YearSelection, dataPurpose } from './perspectives/data-engineer/data'
import { DataEngineerService} from './perspectives/data-engineer/data-engineer.service'
import { StepperComponent} from './navigation/stepper/stepper.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private dataService: DataEngineerService) {
  }

  spinnerVisible: Boolean
  mode: dataPurpose | 'evaluate'
  showPredictions():Boolean {return false}
  showView: 'Engineer' | 'Patient'
  performance:DataView = null
  years: Array<YearSelection> = []
  title = 'Learning Machines Demo V1 - Prognosis Classification with SEER';
  
  ngOnInit():void {
    this.mode = 'train'
    this.dataService.setYears()
      .subscribe((data:Array<YearSelection>) => {
        this.years = data
        this.dataService.initDescriptiveStatisticsData()
      })
    
    // this.years = this.dataService.setYearsManual()
    // this.dataService.initDescriptiveStatisticsData()
    this.performance = this.dataService.getPerformanceData()
  }

  updateMode(mode: dataPurpose | 'evaluate'): void {
    this.mode = mode
    if (this.mode == 'evaluate'){
      this.printPredictions(true);
    }
  }

  trainAndAllowTestSelection():void {
    this.updateMode('test')
  }

  testAndShowPerformance():void {
    this.updateMode('evaluate')
  }

  updateYearSelection():void {
    this.years = this.dataService.getYears()
  }

  printPredictions(show:Boolean):void {
    this.performance=this.dataService.getPerformanceData()
  }

}


