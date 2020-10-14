import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      train: this.formBuilder.group({
      }),
      monitor: this.formBuilder.group({
      }),
      enroll: this.formBuilder.group({
      }),
      outcome: this.formBuilder.group({
      }),
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log("submitted")
  }

}
