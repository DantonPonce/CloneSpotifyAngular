import { SpotifyService } from './../../services/spotify.service';
import { IUser } from './../../Interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss']
})

export class FooterUserComponent implements OnInit {

  signOutIcon = faSignOutAlt
  user!: IUser;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout(){
    this.spotifyService.logout();
  }
}
