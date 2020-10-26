import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PatientComponent } from './perspectives/patients/patient/patient.component';
import { PatientsComponent } from './perspectives/patients/patients.component';
import { PerformanceComponent } from './vis/performance/performance.component';
import { EngineerComponent } from './perspectives/engineer/engineer.component';
import { StepperComponent } from './navigation/stepper/stepper.component';
import { DataEngineerComponent } from './perspectives/data-engineer/data-engineer.component';

import { BarChartComponent } from './vis/bar-chart/bar-chart.component';
import { LineChartComponent } from './vis/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientsComponent, 
    PerformanceComponent,
    EngineerComponent,
    StepperComponent,
    DataEngineerComponent,
    BarChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'engineer-view', component: EngineerComponent},
      {path: 'patient-view', component: PatientsComponent}
    ]),
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
