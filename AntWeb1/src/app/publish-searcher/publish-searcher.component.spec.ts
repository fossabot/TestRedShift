import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishSearcherComponent } from './publish-searcher.component';

describe('PublishSearcherComponent', () => {
  let component: PublishSearcherComponent;
  let fixture: ComponentFixture<PublishSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
