import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { PodcastComponent } from './podcast.component';
import { FeedComponent } from './pages/feed/feed.component';
import { CategoryComponent } from './pages/category/category.component';
import { HistoryComponent } from './pages/history/history.component';
import { SubscribesComponent } from './pages/subscribes/subscribes.component';

const routes: Routes = [
  {
    path: 'podcast', component: PodcastComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'feed/:id', component: FeedComponent },
      { path: 'category/:id/:name', component: CategoryComponent },
      { path: 'search', component: SearchComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'subscribes', component: SubscribesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule { }
