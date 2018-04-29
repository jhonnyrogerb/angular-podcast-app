import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPodcastListComponent } from './top-podcast-list.component';

describe('TopPodcastListComponent', () => {
  let component: TopPodcastListComponent;
  let fixture: ComponentFixture<TopPodcastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPodcastListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPodcastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
