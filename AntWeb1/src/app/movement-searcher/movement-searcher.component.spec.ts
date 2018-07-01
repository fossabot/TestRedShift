import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementSearcherComponent } from './movement-searcher.component';

describe('MovementSearcherComponent', () => {
  let component: MovementSearcherComponent;
  let fixture: ComponentFixture<MovementSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
