import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  podcasts: ItunesPodcast[];

  constructor(
    private podcasService: PodcastService,
    private ngProgress: NgProgress
  ) {
    this.podcasts = new Array(20).fill(new ItunesPodcast());
  }

  async ngOnInit() {
    try {
      this.ngProgress.start();

      this.podcasts = await this.podcasService.getItunesTopPodcast();
    } catch (e) {
      console.log('Fail to load podcasts', e);
    } finally {
      this.ngProgress.done();
    }
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
