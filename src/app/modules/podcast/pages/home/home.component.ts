import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ItunesCategory } from '@shared/models/itunes-category.models';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  categories: ItunesCategory[];
  podcasts: ItunesPodcast[];
  topPodcastLoaded = false;

  constructor(private podcasService: PodcastService) {
    this.podcasts = new Array(20).fill({
      id: '',
      cover: '/assets/img/top-podcast-placeholder.png',
      title: '',
      author: ''
    });
  }

  ngOnInit() {
    this.podcasService
      .getItunesCategories()
      .subscribe(response => this.categories = response);

    this.podcasService
      .getItunesTopPodcast()
      .subscribe(response => {
        this.podcasts = response;
        this.topPodcastLoaded = true;
      });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
