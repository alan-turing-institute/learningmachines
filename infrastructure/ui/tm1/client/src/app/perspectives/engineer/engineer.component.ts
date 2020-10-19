import { Component, OnInit, Input } from '@angular/core';
import { DataView, ChartType } from '../../vis/chartSpecification';

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
      sizeClass: "autoSize",
        vis: "bar", 
        title: "Dataset Size",
        data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases1", 
      sizeClass: "autoSize",
      vis: "bar", 
        title: "Dataset Size",
        data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases2", 
      sizeClass: "autoSize",
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      },
      {id: "numCases3", 
      sizeClass: "autoSize",
      vis: "bar", 
      title: "Dataset Size",
      data: [{x:'2000', y:5427}, {x:'2001', y:5243}, {x:'2002', y:5514}]
      }

    ]
  }
}
