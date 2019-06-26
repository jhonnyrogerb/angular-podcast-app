import { Component } from '@angular/core';
import { PouchdbSubscribeService } from '@core/services/pouchdb-subscribe.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pouchdbSubscribeService: PouchdbSubscribeService, private router: Router) {
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       window['ga']('set', 'page', event.urlAfterRedirects);
       window['ga']('send', 'pageview');
       window['ga']('send', 'pageview', location.pathname);
     }
   });
 }
}
