import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimelineComponent } from './navigation/timeline/timeline.component';
import { PatientComponent } from './perspectives/patients/patient/patient.component';
import { PatientsComponent } from './perspectives/patients/patients.component';
import { PerformanceComponent } from './vis/performance/performance.component';
import { EngineerComponent } from './perspectives/engineer/engineer.component';
import { StepperComponent } from './navigation/stepper/stepper.component';
import { DataEngineerComponent } from './perspectives/data-engineer/data-engineer.component';

import { BarChartComponent } from './vis/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    TimelineComponent,
    PatientsComponent, 
    PerformanceComponent,
    EngineerComponent,
    StepperComponent,
    DataEngineerComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'cases-view', component: PatientsComponent},
      {path: 'model-view', component: EngineerComponent},
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
