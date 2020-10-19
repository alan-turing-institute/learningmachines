import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { YearSelection } from '../../perspectives/data-engineer/data'
import { DataEngineerService} from '../../perspectives/data-engineer/data-engineer.service'

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  form: FormGroup;
  @Input() years: Array<YearSelection>

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
    // this.getYears()
  }

  submit(): void {
    console.log("submitted")
  }

  updateYearSelection() {
    this.years = this.dataService.getYears()
    console.log(this.years)
  }

}
