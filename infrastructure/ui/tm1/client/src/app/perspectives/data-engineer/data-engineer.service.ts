import { Injectable } from '@angular/core';
import { YearSelection } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataEngineerService {

  constructor() { }

  getYears():Array<YearSelection>{
    let yearsSelection:Array<YearSelection> = []
    for (let y = 1992; y <=2017; y++)
    {
      yearsSelection.push({value: y.toString(), 
        purpose: 'unseen', 
        icon: 'circle',
        numberOfRows: Math.round(Math.random()*100)}
      )
    }
    return yearsSelection
  }

}
