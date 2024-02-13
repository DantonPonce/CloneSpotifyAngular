import { newMusic, newPlaylist } from 'src/app/common/factories';
import { IMusic } from './../Interfaces/IMusics';
import { IArtist } from './../Interfaces/IArtist';
import { IPlaylist } from './../Interfaces/IPlaylist';
import { IUser } from './../Interfaces/IUser';
import { addMilliseconds, format } from 'date-fns';

export function SpotifyUserForUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
    return {
        id: user.id,
        name: user.display_name!,
        imageUrl: user.images?.pop()?.url!
    }
}

export function SpotifyPlaylistForPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.pop()?.url!
    }
}

export function SpotifySinglePlaylistForPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
    if (!playlist)
        return newPlaylist();

    return {
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.shift()?.url!,
        musics : []
    }
}

export function SpotifyArtistForArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist {
    return {
        id: spotifyArtist.id,
        imageUrl: spotifyArtist.images.sort((a, b) => a.width! - b.width!).pop()?.url!,
        name: spotifyArtist.name
    }
}

export function SpotifyTrackForMusic(spotifyTrack: SpotifyApi.TrackObjectFull): IMusic {

    if (!spotifyTrack)
        return newMusic();

    const msForMinutes = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }

    return {
        id: spotifyTrack.uri,
        title: spotifyTrack.name,
        album: {
            id: spotifyTrack.album.id,
            name: spotifyTrack.album.name,
            imageUrl: spotifyTrack.album.images.shift()?.url!,
        },
        artists: spotifyTrack.artists.map(artist => ({
            id: artist.id,
            name: artist.name
        })),
        time: msForMinutes(spotifyTrack.duration_ms)
    }
}