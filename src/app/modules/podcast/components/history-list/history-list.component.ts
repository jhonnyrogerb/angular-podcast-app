import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() episodes: ItunesEpisode[];

  constructor(private audioService: AudioService) { }

  ngOnInit() {
  }

  trackEpisode(index, episode) {
    return episode ? episode.src : undefined;
  }

  setEpisode(episode) {
    this.audioService.setAudio(episode);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
