import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderService } from '@core/services/header.service';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  podcasts: ItunesPodcast[];
  categoryName: string;

  constructor(private podcastService: PodcastService,
    private ngProgress: NgProgress,
    private router: ActivatedRoute,
    private headerService: HeaderService) {
    this.podcasts = new Array(40).fill(new ItunesPodcast());
  }

  ngOnInit() {
    this.ngProgress.start();
    this.router.params.subscribe(async (params: Params) => {
      try {
        this.categoryName = params.name;
        this.headerService.headerTitle = this.categoryName;
        this.podcasts = await this.podcastService.searchPodcastByCategory(params.id);
      } catch (e) {
        this.headerService.headerTitle = 'Fail to load category';
        console.log('fail to load category', e);
      } finally {
        this.ngProgress.done();
      }
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

}
