import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderService } from '@core/services/header.service';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  podcasts: ItunesPodcast[];
  categoryName: string;

  constructor(private podcastService: PodcastService,
    private router: ActivatedRoute,
    private headerService: HeaderService) {
    this.podcasts = new Array(200).fill({
      id: '',
      cover: '/assets/img/top-podcast-placeholder.png',
      title: '',
      author: ''
    });
  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.categoryName = params.name;
      this.headerService.headerTitle = this.categoryName;

      this.podcastService
        .searchPodcastByCategory(params.id)
        .subscribe(response => this.podcasts = response);
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

}
