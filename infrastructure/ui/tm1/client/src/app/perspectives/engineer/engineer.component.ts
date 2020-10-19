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
  }
}
