import { RightBarComponent } from './../../components/right-bar/right-bar.component';
import { TopArtistComponent } from './../../components/top-artist/top-artist.component';
import { HomeComponent } from './../home/home.component';
import { FooterUserComponent } from './../../components/footer-user/footer-user.component';
import { MenuButtonComponent } from './../../components/menu-button/menu-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { PlayerComponent } from './player.component';
import { LeftBarComponent } from './../../components/left-bar/left-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftBarComponent,
    MenuButtonComponent,
    FooterUserComponent,
    HomeComponent,
    TopArtistComponent,
    RightBarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})

export class PlayerModule { }
