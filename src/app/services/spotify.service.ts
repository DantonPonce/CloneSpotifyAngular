import { Router } from '@angular/router';
import { IPlaylist } from './../Interfaces/IPlaylist';
import { IUser } from './../Interfaces/IUser';
import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SpotifyArtistForArtist, SpotifyPlaylistForPlaylist, SpotifyTrackForMusic, SpotifyUserForUser } from '../common/spotifyHelper';
import { IArtist } from '../Interfaces/IArtist';
import { IMusic } from '../Interfaces/IMusics';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  spotifyApi!: Spotify.SpotifyWebApiJs;
  user!: IUser;

  constructor(
    private router: Router
  ) {
    this.spotifyApi = new Spotify();
  }

  async startUser() {
    const token = localStorage.getItem('token');

    if(!!this.user){
      return true;
    }
    
    if(!token){
      return false;
    }

    try {

      this.setTokenAcess(token);
      await this.getUserSpotify();
      return !!this.user;

    }catch(ex){

      return false;

    }
  }

  async getUserSpotify(){
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserForUser(userInfo);
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getUrlCallbackToken() {
    if (!window.location.hash){
      return ''
    }
    const params = window.location.hash.substring(1).split('&')
    return params[0].split('=')[1];
  }

  setTokenAcess(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getUserPlaylist(offset = 0, limited = 50): Promise<IPlaylist[]>{
    const playlist = await this.spotifyApi.getUserPlaylists(this.user.id, { limited: 50 });
    return playlist.items.map(SpotifyPlaylistForPlaylist);
  }

  async getTopArtists(limit: number): Promise<IArtist[]>{
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistForArtist);
  }

  async getMusics(offset = 0, limit = 50): Promise<IMusic[]>{
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map(x => SpotifyTrackForMusic(x.track));
  }

  async playMusic(idMusic: string){
    await this.spotifyApi.queue(idMusic);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic>{
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackForMusic(musicSpotify.item!)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
