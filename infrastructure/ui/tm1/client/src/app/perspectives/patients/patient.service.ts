import { Injectable } from '@angular/core';
import { Patient, Personal } from './patient/patient'; 
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients : Array<Patient>

  constructor() { 
    this.patients = this.setPatients()
  }

  setPatients():Array<Patient> {
    this.patients = []
    let years:Array<string>=[]
    for (let y = 1992; y < 2017; y++ ) {
      years.push(y.toString())
    }
    for (let y = 0; y < years.length; y++){
      let p:Patient = { 
        id: Math.round(Math.random()*100).toString(), 
        personalInfo: [
          {name: 'age', value:Math.round(Math.random()*10).toString()},
          {name: 'yearOfDiagnosis', value: years[y]}
        ],
        medicalHistory: []
      }
      this.patients.push(p)
    }
    // console.log(JSON.stringify(this.patients))
    return this.patients
  }

  getPatients(yearsOfDiagnosis:Array<string>):Array<Patient> {
    let patientsByYear:Array<Patient> = this.patients.filter(function(p){
      let personalInfo:Array<Personal> = p.personalInfo
      let yearOfDiagnosis: Array<Personal> = personalInfo.filter(function(info){
        return info.name=="yearOfDiagnosis"
      })
      return (yearOfDiagnosis.length == 1) && (yearsOfDiagnosis.includes(yearOfDiagnosis[0].value))
    })
    return patientsByYear
  }
}
