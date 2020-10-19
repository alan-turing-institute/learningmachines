import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { YearSelection } from './data'
import { DataEngineerService} from './data-engineer.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-engineer',
  templateUrl: './data-engineer.component.html',
  styleUrls: ['./data-engineer.component.css']
})
export class DataEngineerComponent {
  @Input() years:Array<YearSelection>
  @Output() yearsUpdateEvent = new EventEmitter<Boolean>();
  constructor(private dataService: DataEngineerService) { }

  toggleTrainingYear(selectedYear:string): void {
    this.dataService.toggleTrainingYear(selectedYear)
    this.yearsUpdateEvent.emit(true);
  }
}
