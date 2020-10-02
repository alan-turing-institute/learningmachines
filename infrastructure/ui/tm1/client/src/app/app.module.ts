import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TimelineComponent } from './navigation/timeline/timeline.component';
import { PatientComponent } from './perspectives/patients/patient/patient.component';
import { PatientsComponent } from './perspectives/patients/patients.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    TimelineComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
