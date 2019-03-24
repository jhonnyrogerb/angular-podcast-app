import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { AudioService } from '../../../core/services/audio.service';
import { PouchdbAudioService } from '../../../core/services/pouchdb-audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';
import {Options} from 'ng5-slider';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  episode: ItunesEpisode = new ItunesEpisode();
  audio: HTMLAudioElement = new Audio();
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 0.01,
    showSelectionBar: true
  };

  isBarBlocked = false;

  constructor(
    private audioService: AudioService,
    private pouchdbAudioService: PouchdbAudioService
  ) { }


  async ngOnInit() {
    this.episode = await this.getLastAudio();
    this.loadAudio(false);

    this.audioService.changeAudioEvent
      .subscribe((episode: ItunesEpisode) => {
        this.episode = episode;
        this.loadAudio();
      });
  }


  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    if (event.keyCode === 32 && target.tagName !== 'INPUT') {
      event.preventDefault();
      this.pauseAudio();
    }
  }


  loadAudio(autoPlay: boolean = true): void {
    if (!this.audio) this.audio = new Audio();
    if (!this.episode) this.episode = new ItunesEpisode();

    this.audio.pause();
    this.audio.src = this.episode.src;
    this.audio.currentTime = this.episode.currentTime || 0;
    this.audio.load();

    if (autoPlay) this.audio.play();

    this.audio.onloadedmetadata = () => {
      this.episode.durationString = this.getTimeString(this.audio.duration);
      this.episode.currentTimeString = this.getTimeString(this.audio.currentTime);
    };

    this.audio.ontimeupdate = async () => {
      try {
        this.episode.currentTimeString = this.getTimeString(this.audio.currentTime);
        this.episode.currentTime = this.audio.currentTime;

        const progressbarValue = this.audio.currentTime / this.audio.duration;

        if (!this.isBarBlocked) {
          this.episode.progressbar = isNaN(progressbarValue) ? 0 : progressbarValue * 100;
          if (this.episode.progressbar) {
            await this.pouchdbAudioService.putOne(this.episode.src, this.episode);
          }
        }
      } catch (e) {
        console.log('Fail to update track info', e);
      }
    };
  }


  async getLastAudio(): Promise<ItunesEpisode> {
    try {
      const queryResylt = await this.pouchdbAudioService.query(
        { lastPlay: { '$gte': null } },
        { lastPlay: 'desc' }, 1);

      return <ItunesEpisode>queryResylt.docs[0];
    } catch (e) {
      console.log('Fail to get last audio', e);
      return new ItunesEpisode();
    }
  }


  seekAudio(event: MouseEvent): void {
    console.log( this.episode.progressbar / 100, this.episode.progressbar);
    this.audio.currentTime = (this.episode.progressbar / 100)  * this.audio.duration;
    if (this.audio.paused) this.audio.play();
  }


  pauseAudio(): void {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }


  getTimeString(timeInSecs: number): string {
    const timeString = moment('2015-01-01')
      .startOf('day')
      .seconds(timeInSecs)
      .format('H:mm:ss');

    return timeString;
  }
}
