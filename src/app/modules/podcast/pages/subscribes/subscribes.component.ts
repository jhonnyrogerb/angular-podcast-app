import { Component, OnInit } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { PouchdbSubscribeService } from '@core/services/pouchdb-subscribe.service';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';
import { PodcastService } from '@core/http/podcast.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-subscribes',
  templateUrl: './subscribes.component.html',
  styleUrls: ['./subscribes.component.scss']
})
export class SubscribesComponent implements OnInit {
  podcasts: ItunesPodcast[];
  lastEpisodes: ItunesEpisode[];

  constructor(
    private pouchdbSubscribeService: PouchdbSubscribeService,
    private podcastService: PodcastService,
    private audioService: AudioService) {
  }

  async ngOnInit() {
    const [podcasts, lastEpisodes] = await this.getSubscribes();
    this.podcasts = podcasts;
    this.lastEpisodes = lastEpisodes;
    this.updateFeed();
  }


  async getSubscribes(): Promise<any[]> {
    try {
      const queryResylt = await this.pouchdbSubscribeService.query(
        { lastUpdate: { '$gte': null } },
        { lastUpdate: 'desc' },
        1000
      );

      const podcasts = <ItunesPodcast[]>queryResylt.docs;

      const lastEpisodes = podcasts
        .map(podcast => podcast.episodes[0])
        .sort((a, b) => new Date(b.releaseDate).getDate() - new Date(a.releaseDate).getDate());

      return [podcasts, lastEpisodes];
    } catch (e) {
      console.log('Fail load subscribes', e);
      return [];
    }
  }


  setEpisode(episode) {
    this.audioService.setAudio(episode);
  }


  async updateFeed() {
    try {
      const queryResylt = await this.pouchdbSubscribeService.query(
        { lastUpdate: { '$lte': Moment().subtract(1, 'hour').toDate() } },
        { lastUpdate: 'desc' },
        1000
      );

      const podcasts = <ItunesPodcast[]>queryResylt.docs;

      podcasts.map(podcast => {
        this.podcastService
          .getFeed(podcast)
          .subscribe(async response => {
            try {
              const updatedPodcast = await response;
              console.log('updating feed', updatedPodcast.title, 'lastUpdate', updatedPodcast.lastUpdate);
              await this.pouchdbSubscribeService.putOne(String(updatedPodcast.id), updatedPodcast);
            } catch (e) {
              console.log('fail to update feed', e);
            }
          });
      });
    } catch (e) {
      console.log('fail to update feed', e);
    }
  }


}
