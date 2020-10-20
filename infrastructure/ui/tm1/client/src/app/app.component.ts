import { Component, OnInit } from '@angular/core';
import { DataView } from './vis/chartSpecification';

import { YearSelection } from './perspectives/data-engineer/data'
import { DataEngineerService} from './perspectives/data-engineer/data-engineer.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private dataService: DataEngineerService) {
  }
  
  performance:DataView = null
  // descriptiveStatistics: Array<DataView> = []
  years: Array<YearSelection> = []
  title = 'toymodel0';

  ngOnInit():void {
    this.years = this.dataService.getYears()
    this.performance = this.dataService.getPerformanceData()
    // this.descriptiveStatistics = this.dataService.getDescriptiveStatistics()
  }

  updateYearSelection():void {

    this.years = this.dataService.getYears()
    console.log(this.years)
  }

}


