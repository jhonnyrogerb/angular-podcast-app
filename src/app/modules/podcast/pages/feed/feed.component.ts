import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderService } from '@core/services/header.service';
import * as ColorThief from 'color-thief-browser';
import { AudioService } from '@core/services/audio.service';
import { PouchdbSubscribeService } from '@core/services/pouchdb-subscribe.service';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit {
  colorThief: ColorThief = new ColorThief();

  podcast: ItunesPodcast;

  imgLoaded = false;
  isSubscribed = true;
  isRefreshing = false;

  coverColor = '#010101';

  @ViewChild('podcastInfo') podcastInfo: ElementRef;

  constructor(private podcastService: PodcastService,
    private ngProgress: NgProgress,
    private router: ActivatedRoute,
    private headerService: HeaderService,
    private audioService: AudioService,
    private pouchdbSubscribeService: PouchdbSubscribeService) { }

  ngOnInit() {
    this.ngProgress.start();
    this.changeHeader();

    this.router.params.subscribe(async (params: Params) => {
      await this.loadFeedFromDb(params.id);

      if (!this.podcast) this.loadFeedFromWeb(params.id);
      if (!this.podcast) this.isSubscribed = false;
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  changeHeader(error?: string) {
    if (error) return this.headerService.headerTitle  = error;
    this.headerService.headerTitle = this.podcast ? this.podcast.title : 'Loading...';
  }

  async loadFeedFromDb(feedId: string) {
    try {
      this.podcast = await this.pouchdbSubscribeService.getOne(feedId);
      this.ngProgress.done();
    } catch (e) {
      this.changeHeader();
    } finally {
      this.changeHeader();
    }
  }

  async loadFeedFromWeb(feedId: string) {
    this.isRefreshing = true;
    try {
      const podcast = await this.podcastService.getPodcastById(feedId);
      this.podcast = await this.podcastService.getFeed(podcast);
      this.changeHeader();
    } catch (e) {
      this.changeHeader('Fail to Load Feed');
      console.log('Fail to load Feed', e);
    } finally {
      this.ngProgress.done();
      this.isRefreshing = false;
    }
  }


  getColor(event: Event) {
    const eventTarget = <HTMLImageElement>event.target;
    const colorPalette = this.colorThief.getPalette(eventTarget);
    const ramdomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    this.coverColor = `linear-gradient(rgba(${ramdomColor.join(',')},.8), #010101)`;
    this.imgLoaded = true;
  }

  setEpisode(episode) {
    this.audioService.setAudio(episode);
  }

  async subscribeFeed(podcast: ItunesPodcast) {
    try {
      await this.pouchdbSubscribeService.putOne(String(podcast.id), {...podcast, _rev: undefined, subscribed: true});
      this.isSubscribed = true;
    } catch (e) {
      console.log('Failt to subscribe', e);
    }
  }

  async unsubscribeFeed(podcast: ItunesPodcast) {
    try {
      await this.pouchdbSubscribeService.removeOne(String(podcast.id));
      this.isSubscribed = false;
    } catch (e) {
      console.log('Fail to unsubscribe', e);
    }
  }

  async updateFeed() {
    await this.loadFeedFromWeb(this.podcast.id);
    this.pouchdbSubscribeService.putOne(String(this.podcast.id), this.podcast);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
