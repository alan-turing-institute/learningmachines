import { Component, OnInit, Input} from '@angular/core';
import { Patient } from './patient'; 

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor() { }

  opened:Boolean
  @Input() patient: Patient;

  ngOnInit(): void {
    this.opened = false
  }

  displayDetails():void {
    this.opened = true
  }

}
