import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { DataView, ChartType } from '../../vis/chartSpecification';
import { YearSelection, dataPurpose } from '../../perspectives/data-engineer/data'
import { DataEngineerService} from '../../perspectives/data-engineer/data-engineer.service'


@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})

export class EngineerComponent implements OnInit, OnChanges {

  constructor(private dataService: DataEngineerService) { }
  @Input() years: Array<YearSelection>
  @Input() stepperMode: dataPurpose
  descriptiveStatistics: Array<DataView>

  ngOnInit(): void {
    this.descriptiveStatistics=[]
  }

  ngOnChanges(changes: SimpleChanges):void{
    // console.log(changes)
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'years': {
            if ((this.stepperMode != undefined) && (this.stepperMode == 'train'))
              this.updateDescriptiveStatistics()
          }
        }
      }
    }
  }

  updateDescriptiveStatistics() {
    this.descriptiveStatistics=[]
    // get training selection
    let trainingSelection:Array<YearSelection> = this.years.filter(function(element){
      return element.purpose == "train"
    })

    if (trainingSelection.length > 0){
      // get training years
      let trainingYears:Array<Date> = trainingSelection.map(function(element){
        return element.value
      })
      
      this.descriptiveStatistics = this.dataService.getFilteredDescriptiveStatistics(trainingYears)
    }
    else {
      this.descriptiveStatistics = []
    }

    // console.log("Descriptive stats: %s", JSON.stringify(this.descriptiveStatistics))
  }
}
