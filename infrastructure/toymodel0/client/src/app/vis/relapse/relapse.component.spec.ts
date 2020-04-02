import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelapseComponent } from './relapse.component';

describe('RelapseComponent', () => {
  let component: RelapseComponent;
  let fixture: ComponentFixture<RelapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
