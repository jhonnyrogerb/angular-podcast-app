import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribesComponent } from './subscribes.component';

describe('SubscribesComponent', () => {
  let component: SubscribesComponent;
  let fixture: ComponentFixture<SubscribesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
