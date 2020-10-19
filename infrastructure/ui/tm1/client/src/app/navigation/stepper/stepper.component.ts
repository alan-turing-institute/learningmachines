import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { YearSelection } from '../../perspectives/data-engineer/data'
import { DataEngineerService} from '../../perspectives/data-engineer/data-engineer.service'
import { DataView} from '../../vis/chartSpecification';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  form: FormGroup;
  @Input() years: Array<YearSelection>
  @Output() yearsUpdateEvent = new EventEmitter<Boolean>();

  constructor(private formBuilder: FormBuilder, private dataService: DataEngineerService) { 
    this.form = this.formBuilder.group({
      train: this.formBuilder.group({
      }),
      monitor: this.formBuilder.group({
      }),
      enroll: this.formBuilder.group({
      }),
      predict: this.formBuilder.group({
      }),
      record: this.formBuilder.group({
      }),
    });
  }

  getYears():void {
    this.years = this.dataService.getYears()
  }

  ngOnInit(): void {
    this.getYears()
    // this.descriptiveStatistics = []
  }

  submit(): void {
    console.log("submitted")
  }
 
  updateYearSelection() {
    this.yearsUpdateEvent.emit(true);
  }
}
