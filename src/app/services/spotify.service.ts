import { Router } from '@angular/router';
import { IPlaylist } from './../Interfaces/IPlaylist';
import { IUser } from './../Interfaces/IUser';
import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SpotifyPlaylistForPlaylist, SpotifyUserForUser } from '../common/spotifyHelper';

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
    console.log(playlist);
    return playlist.items.map(SpotifyPlaylistForPlaylist);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
