import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdssComponent } from './edss.component';

describe('EdssComponent', () => {
  let component: EdssComponent;
  let fixture: ComponentFixture<EdssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
