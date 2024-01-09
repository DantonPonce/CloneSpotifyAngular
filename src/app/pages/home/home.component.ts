import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { IMusic } from 'src/app/Interfaces/IMusics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musics: IMusic[] = []

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.getMusics();
  }

  async getMusics(){
    this.musics = await this.spotifyService.getMusics();
    console.log(this.musics);
    
  }

}
