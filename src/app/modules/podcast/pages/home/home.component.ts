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

  topPodcasts: ItunesPodcast[];
  topArtsPodcasts: ItunesPodcast[];
  topComedyPodcasts: ItunesPodcast[];
  topEducationPodcasts: ItunesPodcast[];
  topKidsAndFamilyPodcasts: ItunesPodcast[];
  topHealthPodcasts: ItunesPodcast[];
  topTVPodcasts: ItunesPodcast[];
  topMusicPodcasts: ItunesPodcast[];
  topNewsAndPoliticsPodcasts: ItunesPodcast[];
  topReligionAndSpiritualityPodcasts: ItunesPodcast[];
  topScienceAndMedicinePodcasts: ItunesPodcast[];
  topSportsAndRecreationPodcasts: ItunesPodcast[];
  topTechnologyPodcasts: ItunesPodcast[];
  topBusinessPodcasts: ItunesPodcast[];
  topGamesAndHobbiesPodcasts: ItunesPodcast[];
  topSocietyAndCulturePodcasts: ItunesPodcast[];
  topGovernmentAndOrganizationsPodcasts: ItunesPodcast[];


  constructor(
    private podcasService: PodcastService,
    private ngProgress: NgProgress
  ) {
    this.topPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topArtsPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topComedyPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topEducationPodcasts = new Array(20).fill(new ItunesPodcast());
  }

  async ngOnInit() {
    try {
      this.ngProgress.start();

      this.topPodcasts = await this.podcasService.getItunesTopPodcast();

      setTimeout(() => {
        this.podcasService.searchPodcastByCategory('1301', 14).then(v => this.topArtsPodcasts = v);
        this.podcasService.searchPodcastByCategory('1303', 14).then(v => this.topComedyPodcasts = v);
        this.podcasService.searchPodcastByCategory('1304', 14).then(v => this.topEducationPodcasts = v);
        this.podcasService.searchPodcastByCategory('1305', 14).then(v => this.topKidsAndFamilyPodcasts = v);
        this.podcasService.searchPodcastByCategory('1307', 14).then(v => this.topHealthPodcasts = v);
        this.podcasService.searchPodcastByCategory('1309', 14).then(v => this.topTVPodcasts = v);
        this.podcasService.searchPodcastByCategory('1310', 14).then(v => this.topMusicPodcasts = v);
        this.podcasService.searchPodcastByCategory('1311', 14).then(v => this.topNewsAndPoliticsPodcasts = v);
        this.podcasService.searchPodcastByCategory('1314', 14).then(v => this.topReligionAndSpiritualityPodcasts = v);
        this.podcasService.searchPodcastByCategory('1315', 14).then(v => this.topScienceAndMedicinePodcasts = v);
        this.podcasService.searchPodcastByCategory('1316', 14).then(v => this.topSportsAndRecreationPodcasts = v);
        this.podcasService.searchPodcastByCategory('1318', 14).then(v => this.topTechnologyPodcasts = v);
        this.podcasService.searchPodcastByCategory('1321', 14).then(v => this.topBusinessPodcasts = v);
        this.podcasService.searchPodcastByCategory('1323', 14).then(v => this.topGamesAndHobbiesPodcasts = v);
        this.podcasService.searchPodcastByCategory('1324', 14).then(v => this.topSocietyAndCulturePodcasts = v);
        this.podcasService.searchPodcastByCategory('1325', 14).then(v => this.topGovernmentAndOrganizationsPodcasts = v);
      }, 200);

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
