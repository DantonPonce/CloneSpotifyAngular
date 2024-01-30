import { IArtist } from './../../Interfaces/IArtist';
import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/common/factories';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss']
})
export class TopArtistComponent implements OnInit{

  topArtist: IArtist = newArtist();

  constructor(
    private spotifyService: SpotifyService
  ){}

  ngOnInit(): void {
    this.getArtist();
  }

  async getArtist(){
    const artists = await this.spotifyService.getTopArtists(1);

    if(!!artists)
      this.topArtist = artists.pop()!;
  }

}
