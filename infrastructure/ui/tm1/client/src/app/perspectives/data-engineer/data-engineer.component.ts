import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { YearSelection, dataPurpose } from './data'
import { DataEngineerService} from './data-engineer.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-engineer',
  templateUrl: './data-engineer.component.html',
  styleUrls: ['./data-engineer.component.css']
})
export class DataEngineerComponent {
  @Input() stepperMode: dataPurpose
  @Input() years:Array<YearSelection>
  @Output() yearsUpdateEvent = new EventEmitter<Boolean>();
  constructor(private dataService: DataEngineerService) { }

  toggleYearPurpose(selectedYear:Date, purpose: dataPurpose): void {
    this.dataService.toggleYearPurpose(selectedYear, purpose)
    this.yearsUpdateEvent.emit(true);
  }
}
