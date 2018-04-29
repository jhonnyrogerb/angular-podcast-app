import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderService } from '@core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  homeUrls: string[] = ['/', '/home', '/search', '/subscribes', '/history'];
  isHome = true;
  headerTitle: string;

  constructor(private router: Router,
    private location: Location,
    private headerService: HeaderService) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.isHome = [
        ...this.homeUrls,
        ...this.homeUrls.map(v => `/podcast${v}`)
      ].indexOf(this.router.url) > 0;
    });
  }

  goBack() {
    this.location.back();
  }

}
