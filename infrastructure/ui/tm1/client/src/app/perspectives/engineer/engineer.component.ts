import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataView, ChartType } from '../../vis/chartSpecification';
import { YearSelection } from '../../perspectives/data-engineer/data'
import { DataEngineerService} from '../../perspectives/data-engineer/data-engineer.service'


@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})

export class EngineerComponent implements OnInit, OnChanges {

  constructor(private dataService: DataEngineerService) { }
  @Input() years: Array<YearSelection>
  descriptiveStatistics: Array<DataView>

  ngOnInit(): void {
    this.descriptiveStatistics=[]
  }

  ngOnChanges(changes: SimpleChanges):void{
    this.updateDescriptiveStatistics()
  }

  updateDescriptiveStatistics() {
    let trainingSelection:Array<YearSelection> = this.years.filter(function(element){
      return element.purpose == "train"
    })

    if (trainingSelection.length > 0){
      let trainingYears:Array<Date> = trainingSelection.map(function(element){
        return element.value
      })
      this.descriptiveStatistics = this.dataService.getFilteredDescriptiveStatistics(trainingYears)
    }
    else {
      this.descriptiveStatistics = []
    }
  }
}
