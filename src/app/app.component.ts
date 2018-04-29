import { Component } from '@angular/core';
import { PouchdbSubscribeService } from '@core/services/pouchdb-subscribe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pouchdbSubscribeService: PouchdbSubscribeService) {}
}
