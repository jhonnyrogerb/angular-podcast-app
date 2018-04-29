import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { PouchdbAudioService } from '@core/services/pouchdb-audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  episodes: ItunesEpisode[];

  constructor(
    private pouchdbAudioService: PouchdbAudioService,
    private audioService: AudioService) { }

  async ngOnInit() {
    try {
      const queryResylt = await this.pouchdbAudioService.query(
        { lastPlay: { '$gte': null } },
        { lastPlay: 'desc' },
        100
      );
      this.episodes = queryResylt.docs;
    } catch (e) {
      console.log('Fail to get last epsodes', e);
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
