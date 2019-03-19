import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { PouchdbAudioService } from '@core/services/pouchdb-audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';
import { NgProgress } from 'ngx-progressbar';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  episodes: ItunesEpisode[];

  constructor(
    private ngProgress: NgProgress,
    private pouchdbAudioService: PouchdbAudioService,
    private audioService: AudioService) { }

  async ngOnInit() {
    try {
      this.ngProgress.start();
      const { docs: episodes } = await this.pouchdbAudioService
        .query({ lastPlay: { '$gte': null } }, { lastPlay: 'desc' }, 100);

      this.episodes = episodes;
      this.ngProgress.done();
    } catch (e) {
      console.log('Fail to get last epsodes', e);
      this.ngProgress.done();
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
