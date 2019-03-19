import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { PodcastService } from '@core/http/podcast.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchResult: ItunesPodcast[];
  term$ = new Subject<string>();

  @ViewChild('inputSearch') inputEl: ElementRef;

  constructor(private podcastService: PodcastService,
    private ngProgress: NgProgress) {
    this.podcastService
      .searchItunesPodcastOnKeyUp(this.term$)
      .subscribe((response) => {
        this.searchResult = response;
        this.ngProgress.done();
      });
  }

  keyUp(event: KeyboardEvent) {
    this.ngProgress.start();
    if (event.keyCode === 13) this.inputEl.nativeElement.blur();

    const target = <HTMLInputElement>event.target;
    this.term$.next(target.value);
  }


  ngAfterViewInit() {
    window.scrollTo(0, 0);
    this.inputEl.nativeElement.focus();
  }

  ngOnInit() {
  }

}
