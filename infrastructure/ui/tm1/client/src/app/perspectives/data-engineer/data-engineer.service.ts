import { Injectable } from '@angular/core';
import { YearSelection } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataEngineerService {

  yearsSelection:Array<YearSelection>
  constructor() { 
    this.yearsSelection = []
    for (let y = 1992; y <=2017; y++)
    {
      this.yearsSelection.push({value: y.toString(), 
        purpose: 'unseen', 
        icon: 'circle',
        numberOfRows: Math.round(Math.random()*100)}
      )
    }
  }

  getYears():Array<YearSelection>{
    return this.yearsSelection
  }

  toggleTrainingYear(selectedYear:string): void {
    this.yearsSelection = this.yearsSelection.map(function(element, index, array){
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
      return element
    })
  }

}
