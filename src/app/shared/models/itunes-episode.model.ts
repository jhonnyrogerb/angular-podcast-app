export class ItunesEpisode {
    title: string;
    author: string;
    src: string;
    type: string;
    cover: string;
    description: string;
    duration = 0;
    currentTime = 0;
    size: string;
    sizeBytes = 0;
    releaseDate: Date;
    lastPlay: Date;
    progressbar = 0;
    durationString = '00:00';
    currentTimeString = '00:00';
    podcastTitle: string;
    podcastId: string;
}
