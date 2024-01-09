import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';
import { IPlaylist } from './../../Interfaces/IPlaylist';
import { Component, Input, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

  menuSelected: string = "Home";
  playlists: IPlaylist[] = [];

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    ) { }

  ngOnInit(): void { 
    this.getPlaylists();
  }

  clickButton(value: string){
    this.menuSelected = value;
    this.router.navigateByUrl('player/home');

  }

  async getPlaylists(){
    this.playlists = await this.spotifyService.getUserPlaylist()
  }

}
