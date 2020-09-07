import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicianComponent } from './clinician.component';

describe('ClinicianComponent', () => {
  let component: ClinicianComponent;
  let fixture: ComponentFixture<ClinicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
