import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusic } from 'src/app/Interfaces/IMusics';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusic } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musics: IMusic[] = []
  currentMusic: IMusic = newMusic()
  subs: Subscription[] = [];
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic()
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMusics() {
    this.musics = await this.spotifyService.getMusics();
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  getArtist(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }

}
