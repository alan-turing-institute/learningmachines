import { Injectable } from '@angular/core';
import { Patient, Prediction, predictionOptions, causeOfDeathOptions, Death } from './patient/patient'; 

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients : Array<Patient>
  rootUrl: URL

  constructor(private http: HttpClient) { 
    this.rootUrl = new URL("http://13.80.18.73:8080")
    this.patients = []
  }

  setPatients():Array<Patient> {
    this.patients = []
    let years:Array<number>=[]
    for (let y = 1975; y < 2017; y++ ) {
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
        medicalHistory: [],
        treatment:[],
        death: null
      }
      this.patients.push(p)
    }
    return this.patients
  }

  
  getCachedPatients(yearsOfDiagnosis:Array<number>):Patient[]{
    let patientsByYear:Patient[] = this.patients.filter(function(p){
      let yearOfDiagnosis: number = p.yearOfDiagnosis.getFullYear()
      return (yearsOfDiagnosis.includes(yearOfDiagnosis))
    })
    return patientsByYear
  }

  getPatients(yearOfDiagnosis:number):Observable<Patient[]>{
    let numberOfRows:number = 10
    let url:URL=new URL("/getPatients/"
      .concat(yearOfDiagnosis.toString()
        .concat("/")
          .concat(yearOfDiagnosis.toString()
          .concat("/")
            .concat(numberOfRows.toString()))), this.rootUrl)

    return this.http.get<Patient[]>(url.toString())
      .pipe(
        map((patients:Array<any>)=>
          patients.map(patient=>{
            let yearDate:Date = new Date()
            yearDate.setFullYear(patient.year)
            let patientOfYear:Patient = {
              id: (patient as any).id,
              personalInfo: (patient as any).personalInfo,
              yearOfDiagnosis: yearDate,
              medicalHistory:(patient as any).medicalHistory,
              treatment:(patient as any).treatment,
              death:(patient as any).death,
            }
            this.patients.push(patientOfYear)
            return patientOfYear
          })
        )
      )
  }

  updateCauseOfDeath(selectedYears:Array<number>):Array<Patient> {
    function getOutcome(yearOfDiagnosis:Date): Death | null {
      function generatePrediction():Prediction {
        let prediction:predictionOptions = Math.random()>0.5?"class A":"class B"
        let p:Prediction = {value: prediction, 
          confidence:Math.round(Math.random()*100),
          intepreter: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          date: new Date()
          }
        return p
      }

      if (Math.random()<=1.0) {
        let causeOfDeath:causeOfDeathOptions = Math.random()>0.5?"class A":"class B"
        let yearOfDeath:Date = new Date(yearOfDiagnosis.getFullYear()+5)
        let predictedCauseOfDeath = generatePrediction()
        return {
          causeOfDeath: causeOfDeath,
          predictedCauseOfDeath: predictedCauseOfDeath,
          date: yearOfDeath
        }
      }
      else {
        return null
      }
    } 
    this.patients = this.patients.map(function(p) {
      if (selectedYears.includes(p.yearOfDiagnosis.getFullYear())) {
        if (p.death==null){
          return {...p, death:getOutcome(p.yearOfDiagnosis)}
        }
        else {
          return {...p}
        }
      }
      else {
        return {...p}
      }
    })

    return this.getCachedPatients(selectedYears)
  }
}
