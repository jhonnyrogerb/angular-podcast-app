import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderService } from '@core/services/header.service';
import * as ColorThief from 'color-thief-browser';
import { AudioService } from '@core/services/audio.service';
import { PouchdbSubscribeService } from '@core/services/pouchdb-subscribe.service';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';

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
    private router: ActivatedRoute,
    private headerService: HeaderService,
    private audioService: AudioService,
    private pouchdbSubscribeService: PouchdbSubscribeService) { }

  ngOnInit() {
    this.changeHeader();

    this.router.params.subscribe(async (params: Params) => {
      this.podcast = await this.loadFeedFromDb(params.id);
      this.changeHeader();

      if (!this.podcast) this.loadFeedFromWeb(params.id);
      if (!this.podcast) this.isSubscribed = false;
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  changeHeader() {
    this.headerService.headerTitle = this.podcast ? this.podcast.title : 'Loading...';
  }

  async loadFeedFromDb(feedId: string): Promise<ItunesPodcast> {
    try {
      return await this.pouchdbSubscribeService.getOne(feedId);
    } catch (e) {
      console.log('feed not found', e);
      return null;
    }
  }

  loadFeedFromWeb(feedId: string): void {
    this.isRefreshing = true;

    this.podcastService.getPodcastById(feedId).subscribe(podcast => {
      this.podcastService.getFeed(podcast).subscribe(async (response) => {
        try {
          this.podcast = await response;
          this.changeHeader();
        } catch (e) {
          console.log('erro', response);
        }

        this.isRefreshing = false;
      });
    });
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
      await this.pouchdbSubscribeService.putOne(String(podcast.id), podcast);
      this.isSubscribed = true;
    } catch (e) {
      console.log("failt to subscribe", e)
    }
  }

  async unsubscribeFeed(podcast: ItunesPodcast) {
    try {
      await this.pouchdbSubscribeService.removeOne(String(podcast.id));
      this.isSubscribed = false;
    } catch (e) {
      console.log("failt to unsubscribe", e)
    }
  }

  async updateFeed() {
    this.isRefreshing = true;
    this.loadFeedFromWeb(this.podcast.id);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
