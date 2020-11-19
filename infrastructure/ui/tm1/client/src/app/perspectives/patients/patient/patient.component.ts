import { Component, OnInit, Input} from '@angular/core';
import { Patient } from './patient'; 
import { dataPurpose } from '../../data-engineer/data';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor() { }


  opened:Boolean
  @Input() patient: Patient;
  @Input() showPredictionsFlag: Boolean

  ngOnInit(): void {
    this.opened = false
  }

  displayDetails():void {
    // this.opened = true
    // console.log(this.showPredictionsFlag)
  }

}
