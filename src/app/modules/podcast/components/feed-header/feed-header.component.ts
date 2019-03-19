import { Component, OnInit, Input } from '@angular/core';
import * as ColorThief from 'color-thief-browser';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.scss']
})
export class FeedHeaderComponent implements OnInit {

  @Input()
  podcast: ItunesPodcast[];
  private colorThief = new ColorThief();
  private imgLoaded = false;
  private coverColor = '#010101';

  constructor() { }

  ngOnInit() {
  }

  getColor(event: Event) {
    const eventTarget = <HTMLImageElement>event.target;
    const colorPalette = this.colorThief.getPalette(eventTarget);
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    this.coverColor = `linear-gradient(rgba(${randomColor.join(',')},.8), #010101)`;
    this.imgLoaded = true;
  }

}
