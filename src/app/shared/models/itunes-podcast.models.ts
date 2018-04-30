import { ItunesEpisode } from '@shared/models/itunes-episode.model';

export class ItunesPodcast {
    id: string = '';
    author: string = '';
    cover: string = '/assets/img/top-podcast-placeholder.png';
    title: string = '';
    description: string;
    feedUrl: string;
    trackCount: number;
    primaryGenreName: string;
    lastUpdate: Date;
    episodes: ItunesEpisode[];
}
