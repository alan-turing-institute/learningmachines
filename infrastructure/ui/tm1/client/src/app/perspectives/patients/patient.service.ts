import { Injectable } from '@angular/core';
import { Patient } from './patient/patient'; 
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
    let years:Array<number>=[]
    for (let y = 1992; y < 2017; y++ ) {
      years.push(y)
    }

    function getDate(year:number):Date{
      let newDate = new Date()
      newDate.setFullYear(year)
      return newDate
    }

    for (let y = 0; y < years.length; y++){
      let p:Patient = { 
        id: Math.round(Math.random()*100).toString(), 
        yearOfDiagnosis: getDate(years[y]),
        personalInfo: [
          {name: 'age', value:Math.round(Math.random()*10).toString()}
        ],
        medicalHistory: []
      }
      this.patients.push(p)
    }
    console.log(JSON.stringify(this.patients))
    return this.patients
  }

  getPatients(datesOfDiagnosis:Array<Date>):Array<Patient> {
    let yearsOfDiagnosis:Array<number> = datesOfDiagnosis.map(function(d){
      return d.getFullYear();
    })
    let patientsByYear:Array<Patient> = this.patients.filter(function(p){
      let yearOfDiagnosis: number = p.yearOfDiagnosis.getFullYear()
      return (yearsOfDiagnosis.includes(yearOfDiagnosis))
    })
    return patientsByYear
  }
}
