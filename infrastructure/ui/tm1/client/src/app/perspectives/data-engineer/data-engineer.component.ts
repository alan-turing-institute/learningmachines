import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { YearSelection } from './data'
import { DataEngineerService} from './data-engineer.service'


@Component({
  selector: 'app-data-engineer',
  templateUrl: './data-engineer.component.html',
  styleUrls: ['./data-engineer.component.css']
})
export class DataEngineerComponent {
  @Input() years:Array<YearSelection>
  constructor(private dataService: DataEngineerService) { }

  toggleTrainingYear(selectedYear:string): void {
    this.dataService.toggleTrainingYear(selectedYear)
  }
}
