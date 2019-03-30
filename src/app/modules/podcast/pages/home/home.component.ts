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
    this.topKidsAndFamilyPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topHealthPodcasts= new Array(20).fill(new ItunesPodcast());
    this.topTVPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topMusicPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topNewsAndPoliticsPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topReligionAndSpiritualityPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topScienceAndMedicinePodcasts = new Array(20).fill(new ItunesPodcast());
    this.topSportsAndRecreationPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topTechnologyPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topBusinessPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topGamesAndHobbiesPodcasts = new Array(20).fill(new ItunesPodcast());
    this.topSocietyAndCulturePodcasts = new Array(20).fill(new ItunesPodcast());
    this.topGovernmentAndOrganizationsPodcasts = new Array(20).fill(new ItunesPodcast());
  }

  async ngOnInit() {
    try {
      this.ngProgress.start();

      this.topPodcasts = await this.podcasService.getItunesTopPodcast();
      this.topArtsPodcasts = await  this.podcasService.searchPodcastByCategory('1301', 14);
      this.topComedyPodcasts = await  this.podcasService.searchPodcastByCategory('1303', 14);
      this.topEducationPodcasts = await  this.podcasService.searchPodcastByCategory('1304', 14);
      this.topKidsAndFamilyPodcasts = await  this.podcasService.searchPodcastByCategory('1305', 14);
      this.topHealthPodcasts = await  this.podcasService.searchPodcastByCategory('1307', 14);
      this.topTVPodcasts = await  this.podcasService.searchPodcastByCategory('1309', 14);
      this.topMusicPodcasts = await  this.podcasService.searchPodcastByCategory('1310', 14);
      this.topNewsAndPoliticsPodcasts = await  this.podcasService.searchPodcastByCategory('1311', 14);
      this.topReligionAndSpiritualityPodcasts = await  this.podcasService.searchPodcastByCategory('1314', 14);
      this.topScienceAndMedicinePodcasts = await  this.podcasService.searchPodcastByCategory('1315', 14);
      this.topSportsAndRecreationPodcasts = await  this.podcasService.searchPodcastByCategory('1316', 14);
      this.topTechnologyPodcasts = await  this.podcasService.searchPodcastByCategory('1318', 14);
      this.topBusinessPodcasts = await  this.podcasService.searchPodcastByCategory('1321', 14);
      this.topGamesAndHobbiesPodcasts = await  this.podcasService.searchPodcastByCategory('1323', 14);
      this.topSocietyAndCulturePodcasts = await  this.podcasService.searchPodcastByCategory('1324', 14);
      this.topGovernmentAndOrganizationsPodcasts = await  this.podcasService.searchPodcastByCategory('1325', 14);

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
