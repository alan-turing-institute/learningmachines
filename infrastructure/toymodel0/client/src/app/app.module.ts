import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientComponent } from './perspectives/patient/patient.component';
import { ClinicianComponent } from './perspectives/clinician/clinician.component';
import { EngineerComponent } from './perspectives/engineer/engineer.component';
import { MapComponent } from './vis/map/map.component';
import { EdssComponent } from './vis/edss/edss.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    ClinicianComponent,
    EngineerComponent,
    MapComponent,
    EdssComponent
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
