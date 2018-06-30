import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesSearcherComponent } from './countries-searcher.component';

describe('CountriesSearcherComponent', () => {
  let component: CountriesSearcherComponent;
  let fixture: ComponentFixture<CountriesSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
