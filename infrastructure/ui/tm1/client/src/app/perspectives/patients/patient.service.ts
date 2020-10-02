import { Injectable } from '@angular/core';
import { Patient } from './patient/patient'; 
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getPatients():Array<Patient> {
    let patients:Patient[] = [
      { id: '1', name: 'John Doe' },
      { id: '1', name: 'John Doe' },
      { id: '1', name: 'John Doe' },
      { id: '1', name: 'John Doe' },
      { id: '1', name: 'John Doe' }
    ]
    return patients
  }
}
