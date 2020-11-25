import { Component, Input, OnChanges, SimpleChange, OnInit, SimpleChanges, AfterViewChecked, AfterViewInit } from '@angular/core';
import { YearSelection, dataPurpose } from './data'
import { DataEngineerService} from './data-engineer.service'
import { Output, EventEmitter } from '@angular/core';
import { isUndefined } from 'util';

@Component({
  selector: 'app-data-engineer',
  templateUrl: './data-engineer.component.html',
  styleUrls: ['./data-engineer.component.css']
})

export class DataEngineerComponent implements OnChanges{
  @Input() stepperMode: dataPurpose
  @Input() years:Array<YearSelection>
  @Output() yearsUpdateEvent = new EventEmitter<Boolean>();
  constructor(private dataService: DataEngineerService) { }

  ngOnChanges(changes:SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'years': {
            // if ((changes[propName].previousValue != undefined) 
            // && (changes[propName].previousValue).length == 0){    
            //   this.toggleYearPurpose(this.years[0].value, 'train')
            // }

            // if ((changes[propName].currentValue != undefined) 
            //   && (changes[propName].previousValue == undefined)){    
            //   console.log("Update First Year to training: %s", changes[propName])
            //   this.toggleYearPurpose(this.years[0].value, 'train')
            // }
          }
        }
      }
    }
  }

  toggleYearPurpose(selectedYear:Date, purpose: dataPurpose): void {
    this.dataService.toggleYearPurpose(selectedYear, purpose)
    this.yearsUpdateEvent.emit(true);
    
  //   // if (this.isLatestYear(selectedYear, purpose)) {
  //   //   if (purpose == 'train') {
  //   //     if (this.dataService.getYearPurpose(selectedYear) == 'train')
  //   //       this.latestTrainingYear = selectedYear
  //   //     else
  //   //       this.latestTrainingYear = null
  //   //   }
  //   //   if (purpose == 'test') {
  //   //     if (this.dataService.getYearPurpose(selectedYear) == 'test')
  //   //       this.latestTestYear = selectedYear
  //   //     else
  //   //       this.latestTrainingYear = null
  //   //   }
    // }
  }

  // isLatestYear(selectedYear:Date, purpose: dataPurpose):Boolean{
  //   let yearsForPurpose:Array<number> = this.years
  //     .filter((year:YearSelection)=>{
  //       return year.purpose == purpose
  //     })
  //     .map((year:YearSelection)=>{
  //       return year.valueAsSortable(year.value)
  //     })
      
  //   if (yearsForPurpose.indexOf(selectedYear.getFullYear()) == (yearsForPurpose.length-1))
  //     return true
  //   return false
  // }

}
