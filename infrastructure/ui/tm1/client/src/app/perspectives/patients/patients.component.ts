import { Component, OnInit } from '@angular/core';
import { Patient } from './patient/patient'; 
import { PatientService } from './patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  constructor(private patientService: PatientService) { }
  patients : Array<Patient>
  
  ngOnInit(): void {
    this.patients = this.patientService.getPatients()
  }
}
