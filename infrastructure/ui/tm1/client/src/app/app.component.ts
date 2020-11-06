import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataView } from './vis/chartSpecification';

import { YearSelection } from './perspectives/data-engineer/data'
import { DataEngineerService} from './perspectives/data-engineer/data-engineer.service'
import { StepperComponent} from './navigation/stepper/stepper.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  constructor(private dataService: DataEngineerService) {
  }

  @ViewChild(StepperComponent)
  private stepper: StepperComponent 
  showPredictions():Boolean {return false}

  performance:DataView = null
  // descriptiveStatistics: Array<DataView> = []
  years: Array<YearSelection> = []
  title = 'Learning Machines Demo V1 - Prognosis Classification with SEER';
  
  ngOnInit():void {
    this.years = this.dataService.getYears()
    this.performance = this.dataService.getPerformanceData()
    // this.descriptiveStatistics = this.dataService.getDescriptiveStatistics()
  }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.showPredictions = () => this.stepper.mode=='evaluate'?true:false, 0);
  }

  updateYearSelection():void {
    this.years = this.dataService.getYears()
    // console.log(this.years)
  }

  printPredictions(show:Boolean):void {
    this.performance=this.dataService.getPerformanceData()
  }

}


