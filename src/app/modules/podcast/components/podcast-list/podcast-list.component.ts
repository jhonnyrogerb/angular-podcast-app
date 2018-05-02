import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { trigger, transition, stagger, animate, style, query, state } from '@angular/animations';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
})
export class PodcastListComponent implements OnInit {

  @Input() podcasts: ItunesPodcast[];
  @Input() topPodcastLoaded = false;

  constructor() {
  }

  ngOnInit() {
  }

  trackPodcast(index, podcast) {
    return podcast ? podcast.id : undefined;
  }
}
