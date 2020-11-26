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
  errorColor: string = "red"
  @Input() years:Array<YearSelection>
  @Input() showPredictionsFlag:Boolean

  ngOnInit(): void {
    this.patientService.setPatients();
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
      // this is for manual
      this.selectedPatients = this.patientService.updateCauseOfDeath(testYears)

      // this is for getting data from API
      // for (let indexYear: number=0; indexYear < testYears.length; indexYear++) {
      //   let yearOfDiagnosis:number = testYears[indexYear]
        
      //   this.patientService.getPatients(yearOfDiagnosis)
      //     .subscribe((patients:Array<Patient>) => {
      //     this.selectedPatients = this.selectedPatients.concat(patients)
      //   })
      // }

      // sort patients with yearOfDiagnosis
      this.selectedPatients.sort(function (p1, p2) {
        return p1.yearOfDiagnosis-p2.yearOfDiagnosis
      })
    }
    else {
      this.selectedPatients = []
    }

    // console.log("Selected Patients: %s", this.selectedPatients)
  }
}
