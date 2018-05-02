import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  @Input() episodes: ItunesEpisode[];

  constructor(private audioService: AudioService) { }

  ngOnInit() {
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
}
