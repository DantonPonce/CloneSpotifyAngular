import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUrlCallbackToken();
  }

  redirectToLogin() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

  getUrlCallbackToken() {
    const token = this.spotifyService.getUrlCallbackToken();
    if (!!token){
      this.spotifyService.setTokenAcess(token);
      this.router.navigate(['/player/home']);
    }
  }

}

