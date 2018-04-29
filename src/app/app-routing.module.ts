import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodcastModule } from './modules/podcast/podcast.module';

const routes: Routes = [
  { path: '', redirectTo: 'podcast', pathMatch: 'full' },
  {
    path: 'podcast', loadChildren: 'app/modules/podcast/podcast.module#PodcastModule'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
