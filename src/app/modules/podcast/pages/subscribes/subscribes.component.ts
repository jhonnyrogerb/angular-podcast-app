import { Component, OnInit } from '@angular/core';
import { AudioService } from '@core/services/audio.service';
import { PouchdbSubscribeService } from '@core/services/pouchdb-subscribe.service';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';
import { PodcastService } from '@core/http/podcast.service';
import * as Moment from 'moment';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-subscribes',
  templateUrl: './subscribes.component.html',
  styleUrls: ['./subscribes.component.scss']
})
export class SubscribesComponent implements OnInit {
  podcasts: ItunesPodcast[];
  lastEpisodes: ItunesEpisode[];

  constructor(
    private ngProgress: NgProgress,
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
      this.ngProgress.start();
      const { docs: podcasts }: { docs: ItunesPodcast[] } = await this.pouchdbSubscribeService
        .query({ lastUpdate: { '$gte': null } }, { lastUpdate: 'desc' }, 1000);

      const lastEpisodes = podcasts
        .map(podcast => podcast.episodes[0])
        .sort((a, b) => new Date(b.releaseDate).getDate() - new Date(a.releaseDate).getDate());

      return [podcasts, lastEpisodes];
    } catch (e) {
      console.log('Fail load subscribes', e);
      return [];
    } finally {
      this.ngProgress.done();
    }
  }


  setEpisode(episode) {
    this.audioService.setAudio(episode);
  }


  async updateFeed() {
    try {
      const oneHour = Moment().subtract(1, 'hour').toDate();
      const { docs: podcasts }: { docs: ItunesPodcast[] } = await this.pouchdbSubscribeService
        .query({ lastUpdate: { '$lte': oneHour } }, { lastUpdate: 'desc' }, 1000);

      podcasts.forEach(async podcast => {
        try {
          const feed = await this.podcastService.getFeed(podcast);
          const updatedPodcast = await feed;
          await this.pouchdbSubscribeService.putOne(String(updatedPodcast.id), updatedPodcast);
          console.log('updating feed', updatedPodcast.title, 'lastUpdate', updatedPodcast.lastUpdate);
        } catch (e) {
          console.log('fail to update feed', e);
        }
      });
    } catch (e) {
      console.log('fail to update feed', e);
    }
  }


}
