import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEngineerComponent } from './data-engineer.component';

describe('DataEngineerComponent', () => {
  let component: DataEngineerComponent;
  let fixture: ComponentFixture<DataEngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
