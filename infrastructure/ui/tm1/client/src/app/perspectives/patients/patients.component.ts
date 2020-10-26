import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Patient } from './patient/patient'; 
import { PatientService } from './patient.service';
import { YearSelection } from '../data-engineer/data';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  constructor(private patientService: PatientService) { }
  patients : Array<Patient>
  @Input() years:Array<YearSelection>

  ngOnInit(): void {
    // this.patients = this.patientService.getPatients()
    this.patients = []
  }

  ngOnChanges(changes: SimpleChanges):void{
    this.updatePatients()
  }

  updatePatients() {
    let testSelection:Array<YearSelection> = this.years.filter(function(element){
      return element.purpose == "test"
    })

    if (testSelection.length > 0){
      let testYears:Array<Date> = testSelection.map(function(element){
        return element.value
      })

      this.patients = this.patientService.getPatients(testYears)
    }
    else {
      this.patients = []
    }
  }
}
