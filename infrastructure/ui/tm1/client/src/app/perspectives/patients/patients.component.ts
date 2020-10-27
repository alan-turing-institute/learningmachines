import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Patient } from './patient/patient'; 
import { PatientService } from './patient.service';
import { YearSelection, dataPurpose } from '../data-engineer/data';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  constructor(private patientService: PatientService) { }
  selectedPatients : Array<Patient>
  @Input() years:Array<YearSelection>
  @Input() showPredictionsFlag:Boolean

  ngOnInit(): void {
    // this.patients = this.patientService.getPatients()
    this.selectedPatients = []
  }

  ngOnChanges(changes: SimpleChanges):void{
    this.updatePatients()
  }

  updatePatients() {
    // get the test years
    let testSelection:Array<YearSelection> = this.years.filter(function(element){
      return element.purpose == "test"
    })

    if (testSelection.length > 0){
      // get test dates
      let testYears:Array<number> = testSelection.map(function(element){
        return element.valueAsSortable(element.value)
      })

      // update the cause of death
      this.selectedPatients = this.patientService.updateCauseOfDeath(testYears)

      // sort patients with yearOfDiagnosis
      this.selectedPatients.sort(function (p1, p2) {
        return p1.yearOfDiagnosis.getFullYear()-p2.yearOfDiagnosis.getFullYear()
      })
    }
    else {
      this.selectedPatients = []
    }
  }
}
