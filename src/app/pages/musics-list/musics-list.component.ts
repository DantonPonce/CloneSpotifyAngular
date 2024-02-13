import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from './../../Interfaces/IMusics';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-musics-list',
  templateUrl: './musics-list.component.html',
  styleUrls: ['./musics-list.component.scss']
})
export class MusicsListComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];
  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();
  bannerImageUrl: string = '';
  bannerText: string = '';
  title: string = '';

  playIcon = faPlay;

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getMusics() {
    const sub = this.activedRoute.paramMap.subscribe(async params => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getPageData(type!, id!);
    })

    this.subs.push(sub);
  }

  async getPageData(type: string, id: string) {
    if (type === 'playlist')
      await this.getPlaylistData(id);
    else
      await this.getArtistData(id);
  }

  async getPlaylistData(playlisId: string) {
    const musicsPlaylist = await this.spotifyService.getPlaylistMusics(playlisId);
    this.setPageData(
      musicsPlaylist.name,
      musicsPlaylist.imageUrl,
      musicsPlaylist.musics!)
      this.title = 'Playlist Musics ' + musicsPlaylist.name
  }

  async getArtistData(artistId: string) {

  }

  setPageData(bannerText: string, BannerImage: string, musics: IMusic[]) {
    this.bannerText = bannerText
    this.bannerImageUrl = BannerImage;
    this.musics = musics;
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }

  getArtist(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }
}