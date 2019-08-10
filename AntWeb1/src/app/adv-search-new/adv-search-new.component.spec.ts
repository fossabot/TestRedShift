import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvSearchNewComponent } from './adv-search-new.component';

describe('AdvSearchNewComponent', () => {
  let component: AdvSearchNewComponent;
  let fixture: ComponentFixture<AdvSearchNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvSearchNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvSearchNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
