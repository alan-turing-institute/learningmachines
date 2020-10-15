import { Component, OnInit } from '@angular/core';
import { YearSelection } from './data'
import { DataEngineerService} from './data-engineer.service'


@Component({
  selector: 'app-data-engineer',
  templateUrl: './data-engineer.component.html',
  styleUrls: ['./data-engineer.component.css']
})
export class DataEngineerComponent implements OnInit {

  constructor(private dataService: DataEngineerService) { }
  years: Array<YearSelection>

  ngOnInit(): void {
    this.getYears()
  }

  getYears():void {
    this.years = this.dataService.getYears()
  }

  toggleTrainingYear(selectedYear:string): void {
    this.years.map(function(element, index, array){
      if (element.value == selectedYear){
        if (element.purpose == 'unseen') {
          element.purpose = 'train'
          element.icon = 'success-standard'
        }
        else if (element.purpose == 'train') {
          element.purpose = 'unseen'
          element.icon = 'circle'
        }
      }
    })
  }

}
