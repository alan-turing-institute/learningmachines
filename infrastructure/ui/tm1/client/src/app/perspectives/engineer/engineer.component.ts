import { Component, OnInit, Input } from '@angular/core';
// import { DataView, ChartType } from '../../vis/ChartSpecification';
type ChartType = "bar" | "line"
interface DataView {
  id: string
  vis: ChartType
  title: string
  data: Array<{x:string, y:number}>
}

@Component({
  selector: 'app-engineer',
  templateUrl: './engineer.component.html',
  styleUrls: ['./engineer.component.css']
})

export class EngineerComponent implements OnInit {

  constructor() { }
  @Input() descriptiveStatistics: Array<DataView>

  ngOnInit(): void {
    this.descriptiveStatistics = [
      {id: "numCases", 
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases1", 
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases2", 
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases3", 
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      }

    ]
  }
}
