import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchResult: ItunesPodcast[];
  term$ = new Subject<string>();

  @ViewChild('inputSearch') inputEl: ElementRef;

  constructor(private podcastService: PodcastService) {
    this.podcastService
      .searchItunesPodcastOnKeyUp(this.term$)
      .subscribe((response) => this.searchResult = response);
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.inputEl.nativeElement.focus();
  }

  ngOnInit() {
  }

}
