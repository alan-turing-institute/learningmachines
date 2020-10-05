import { Injectable } from '@angular/core';
import { Patient } from './patient/patient'; 
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getPatients():Array<Patient> {
    let patients:Patient[] = [
      { id: '1', 
        personalInfo: [
          {name: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '2', 
        personalInfo: [
          {name: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '1', 
        personalInfo: [
          {name: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '2', 
        personalInfo: [
          {name: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '1', 
        personalInfo: [
          {name: 'age', value:'16'}
        ],
        medicalHistory: []
      },
      { id: '2', 
        personalInfo: [
          {name: 'age', value:'16'}
        ],
        medicalHistory: []
      },
    ]
    return patients
  }
}
