import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerComponent } from './engineer.component';

describe('EngineerComponent', () => {
  let component: EngineerComponent;
  let fixture: ComponentFixture<EngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
