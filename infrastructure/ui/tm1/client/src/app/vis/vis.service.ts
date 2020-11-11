import { Injectable } from '@angular/core';
import { OutcomeCategories, AxisData, ChartJSYAxisData, Pallette } from './chartSpecification';

@Injectable({
  providedIn: 'root'
})
export class VisService {

  constructor() { }

  getDatasets(data:AxisData[]):ChartJSYAxisData[]{
    // gets all the perspectives, flatten into single array 
    // eg [['a'],['a',b']] -> ['a', 'a', 'b']
    let perspectives:OutcomeCategories[] = []
      .concat(...data
        .map((data:AxisData)=>{return data.perspective}))
    
    // get unique values from single dimension array
    // eg ['a','b']
    let uniquePerspectives:OutcomeCategories[] = [...new Set(perspectives)];
    
    let datasets:ChartJSYAxisData[] = []

    uniquePerspectives.map((p:OutcomeCategories, index)=>{
      let dataOfPerspective:Array<number> = data.map((data:AxisData)=>{
        let indexOfPerspective:number = data.perspective.indexOf(p)
        if (indexOfPerspective > -1)
          return data.y[indexOfPerspective]
      })
      let dataset:{label: string, data: Array<number>, backgroundColor: string} = {
        label: p,
        data: dataOfPerspective,
        backgroundColor: Pallette[index]
      };
      datasets.push(dataset)
    })
    return datasets
  }

  getYearLabels(data:AxisData[]):Array<string>{
    let years:Array<string> = data.map((data:AxisData)=>{
      return data.x
    })

    let uniqueYears:Array<string> = [...new Set(years)];
    return uniqueYears
  }
}
