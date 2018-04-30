import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PodcastModule } from './modules/podcast/podcast.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudioService } from './core/services/audio.service';
import { PouchdbAudioService } from './core/services/pouchdb-audio.service';
import { PouchdbSubscribeService } from './core/services/pouchdb-subscribe.service';
import { HeaderComponent } from './core/components/header/header.component';
import { AudioPlayerComponent } from './core/components/audio-player/audio-player.component';
import { HeaderService } from '@core/services/header.service';
import { SharedModule } from '@shared/shared.module';
import { PodcastService } from '@core/http/podcast.service';
import { environment } from 'environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

export const PodcastProvider = (provider: PodcastService) => {
  return () => provider.getLocation();
};

@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    HeaderComponent,
  ],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js',  { enabled: environment.production }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgProgressModule,
    PodcastModule,
    AppRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [
    HeaderService,
    PouchdbAudioService,
    PouchdbSubscribeService,
    AudioService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: PodcastProvider, deps: [PodcastService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
