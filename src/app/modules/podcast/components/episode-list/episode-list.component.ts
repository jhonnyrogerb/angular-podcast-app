import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';
import {ItunesPodcast} from '@shared/models/itunes-podcast.models';
import {ToHttpsPipe} from '@shared/pipes/to-https.pipe';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  @Input() episodes: ItunesEpisode[];
  @Input() podcast: ItunesPodcast;

  fallbackImage = '/assets/img/top-podcast-placeholder.png';

  constructor(
          private audioService: AudioService,
          private toHttpPipe: ToHttpsPipe
  ) { }

  ngOnInit() {
    if (this.podcast) this.fallbackImage = this.toHttpPipe.transform( this.podcast.cover);
  }

  setEpisode(episode) {
    this.audioService.setAudio(episode);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  trackEpisode(index, episode) {
    return episode ? episode.src : undefined;
  }

  openDescription(event: Event, episode: ItunesEpisode) {
    event.stopPropagation();
    episode.descriptionOpened = !episode.descriptionOpened;
  }
}
