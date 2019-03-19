import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ItunesCategory } from '@shared/models/itunes-category.models';
import { ItunesPodcast } from '@shared/models/itunes-podcast.models';
import { environment } from 'environments/environment';

import * as Parser from 'rss-parser';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/timeout';

import { ToHttpsPipe } from '@shared/pipes/to-https.pipe';
import { HeaderService } from '@core/services/header.service';


@Injectable()
export class PodcastService {
  private itunesTopPodcastObservable: Promise<ItunesPodcast[]>;
  private itunesCategoriesObservable: Promise<ItunesCategory[]>;

  private apiEndpoint: string;
  private countryCode = 'US';

  constructor(private http: HttpClient,
    private toHttpPipe: ToHttpsPipe) {
    this.apiEndpoint = environment.apiEndpoint;
  }

  async getLocation() {
    try {
      const { country } = await this.http
        .get<any>('https://ipapi.co/json/?callback=')
        .timeout(1500)
        .catch(this.handleError)
        .toPromise();

      if (country) this.countryCode = country;
      return true;
    } catch (e) {
      return true;
    }
  }

  getItunesTopPodcast(limit: number = 20): Promise<ItunesPodcast[]> {
    if (this.itunesTopPodcastObservable) return this.itunesTopPodcastObservable;

    this.itunesTopPodcastObservable = this.http
      .get<any>(`${this.apiEndpoint}/podcast/top/charts?countryCode=${this.countryCode}&limit=${limit}`)
      .map((response) => {
        return response.feed.results
          .map(podcast => <ItunesPodcast>{
            ...podcast,
            author: podcast.artistName,
            cover: podcast.artworkUrl100,
            title: podcast.name,
            primaryGenreName: podcast.genres[0].name,
            lastUpdate: podcast.releaseDate
          });
      })
      .publishReplay()
      .refCount()
      .catch(this.handleError)
      .toPromise();

    return this.itunesTopPodcastObservable;
  }


  getItunesCategories(): Promise<ItunesCategory[]> {
    if (this.itunesCategoriesObservable) return this.itunesCategoriesObservable;

    this.itunesCategoriesObservable = this.http
      .get<any>(`${this.apiEndpoint}/genre`)
      .map(response => response)
      .publishReplay()
      .refCount()
      .catch(this.handleError)
      .toPromise();

    return this.itunesCategoriesObservable;
  }


  searchItunesPodcastOnKeyUp(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchItunesPodcast(term));
  }

  searchItunesPodcast(term: string): Observable<ItunesPodcast[]> {
    return this.http
      .get<any>(`${this.apiEndpoint}/podcast?countryCode=${this.countryCode}&term=${term}`)
      .map(response => response)
      .catch(this.handleError);
  }

  searchPodcastByCategory(categoryId: string): Promise<ItunesPodcast[]> {
    return this.http
      // tslint:disable-next-line
      .get<any>(`${this.apiEndpoint}/genre/${categoryId}?countryCode=${this.countryCode}`)
      .map((response) => {
        return response.results
          .map(podcast => <ItunesPodcast>{
            ...podcast,
            id: podcast.collectionId,
            author: podcast.artistName,
            cover: podcast.artworkUrl600,
            title: podcast.collectionName,
            lastUpdate: podcast.releaseDate
          });
      })
      .catch(this.handleError)
      .toPromise();
  }

  getFeed(podcast: ItunesPodcast): Promise<ItunesPodcast> {
    return this.http
      .get(`${this.apiEndpoint}/podcast/${podcast.id}/feed`)
      .map(response => response)
      .catch(this.handleError)
      .toPromise();
  }

  getPodcastById(id: string): Promise<ItunesPodcast> {
    return this.http
      .get<any>(`${this.apiEndpoint}/podcast/${id}`)
      .map(response => response)
      .catch(this.handleError)
      .toPromise();
  }

  private handleError(error): Observable<any> {
    return Observable.throw(error || 'Server error');
  }

}
