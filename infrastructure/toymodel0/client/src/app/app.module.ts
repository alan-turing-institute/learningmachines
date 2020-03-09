import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './perspectives/patient/patient.component';
import { ClinicianComponent } from './perspectives/clinician/clinician.component';
import { EngineerComponent } from './perspectives/engineer/engineer.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    ClinicianComponent,
    EngineerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
