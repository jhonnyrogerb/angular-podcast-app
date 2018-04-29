import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { PouchdbAudioService } from './pouchdb-audio.service';
import { ItunesEpisode } from '@shared/models/itunes-episode.model';

@Injectable()
export class AudioService {
    changeAudioEvent: EventEmitter<ItunesEpisode> = new EventEmitter<ItunesEpisode>();

    constructor(private pouchdbAudioService: PouchdbAudioService) { }

    private async getCachedAudio(id: string) {
        try {
            return <ItunesEpisode>await this.pouchdbAudioService.getOne(id);
        } catch (e) {
            if (e.status === 404) return;
            console.log('fail to get cached audio', e);
            return;
        }
    }

    public async setAudio(episode: ItunesEpisode) {
        try {
            const cachedEpisode = await this.getCachedAudio(episode.src);
            if (cachedEpisode) return this.changeAudioEvent.emit(cachedEpisode);

            await this.pouchdbAudioService.putOne(episode.src, episode);
            this.changeAudioEvent.emit(episode);
        } catch (e) {
            console.log('fail to set current episode', e);
        }
    }
}

