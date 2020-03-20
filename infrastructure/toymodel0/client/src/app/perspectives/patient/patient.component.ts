import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor() { }

  patientID:string = "#1234567"
  patientAge: number = 36
  patientName: string = "John Doe"

  ngOnInit(): void {

  }

}
