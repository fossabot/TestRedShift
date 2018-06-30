import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSearcherComponent } from './period-searcher.component';

describe('PeriodSearcherComponent', () => {
  let component: PeriodSearcherComponent;
  let fixture: ComponentFixture<PeriodSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
