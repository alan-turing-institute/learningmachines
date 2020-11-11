import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { YearSelection, dataPurpose } from '../../perspectives/data-engineer/data'
// import { DataEngineerService} from '../../perspectives/data-engineer/data-engineer.service'
// import { PatientService} from '../../perspectives/patients/patient.service'
// import { DataView} from '../../vis/chartSpecification';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  form: FormGroup;
  mode: dataPurpose | 'evaluate'
  @Input() years: Array<YearSelection>
  @Output() yearsUpdateEvent = new EventEmitter<true>();
  @Output() predictionRequestEvent = new EventEmitter<true>();

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      train: this.formBuilder.group({
      }),
      enroll: this.formBuilder.group({
      }),
      monitor: this.formBuilder.group({
      }),
    });
  }

  ngOnInit(): void {
    this.mode = 'train'
  }

  submit(): void {
    console.log("submitted")
  }
 
  updateYearSelection() {
    this.yearsUpdateEvent.emit(true);
  }

  updateStepperMode(mode: dataPurpose | 'evaluate'): void {
    this.mode = mode
    if (this.mode == 'evaluate'){
      this.predictionRequestEvent.emit(true);
    }
  }
}
