import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastRoutingModule } from './podcast-routing.module';
import { PodcastComponent } from './podcast.component';
import { FormsModule } from '@angular/forms';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { FeedComponent } from './pages/feed/feed.component';
import { CategoryComponent } from './pages/category/category.component';
import { HistoryComponent } from './pages/history/history.component';
import { SubscribesComponent } from './pages/subscribes/subscribes.component';
import { PodcastListComponent } from './components/podcast-list/podcast-list.component';
import { FeedHeaderComponent } from './components/feed-header/feed-header.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { PodcastService } from '@core/http/podcast.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PodcastRoutingModule
  ],
  declarations: [
    EpisodeListComponent,
    PodcastComponent,
    SearchComponent,
    HomeComponent,
    FeedComponent,
    CategoryListComponent,
    PodcastListComponent,
    CategoryComponent,
    HistoryComponent,
    SubscribesComponent,
    EpisodeListComponent,
    FeedHeaderComponent,
    HistoryListComponent,
  ],
  exports: [
    PodcastComponent
  ],
  providers: [
    PodcastService
  ]

})
export class PodcastModule { }
