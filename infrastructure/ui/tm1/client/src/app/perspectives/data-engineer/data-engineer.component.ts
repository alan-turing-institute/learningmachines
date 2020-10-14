import { Component, OnInit } from '@angular/core';

type PurposeTypes = "train" | "test" | "unseen"
type IconTypes = "circle" | "dot-circle" | "success-standard" | "error-standard"

interface YearSelection {
  value: number;
  purpose: PurposeTypes;
  icon: IconTypes;
}

@Component({
  selector: 'app-data-engineer',
  templateUrl: './data-engineer.component.html',
  styleUrls: ['./data-engineer.component.css']
})
export class DataEngineerComponent implements OnInit {

  constructor() { }

  years: Array<YearSelection>

  ngOnInit(): void {
    this.years = [
      {value: 2000, purpose: 'unseen', icon: 'circle'},
      {value: 2001, purpose: 'unseen', icon: 'circle'},
      {value: 2002, purpose: 'unseen', icon: 'circle'}
    ]
  }

  toggleTrainingYear(selectedYear:number): void {
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
