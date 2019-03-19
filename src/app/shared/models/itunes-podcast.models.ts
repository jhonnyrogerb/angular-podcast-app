import { ItunesEpisode } from '@shared/models/itunes-episode.model';

export class ItunesPodcast {
    id = '';
    author = '';
    cover = '/assets/img/top-podcast-placeholder.png';
    title = '';
    description: string;
    feedUrl: string;
    trackCount: number;
    primaryGenreName: string;
    lastUpdate: Date;
    episodes: ItunesEpisode[];
}
