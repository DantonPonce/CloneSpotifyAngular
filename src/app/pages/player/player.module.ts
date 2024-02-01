import { PlayerCardComponent } from './../../components/player-card/player-card.component';
import { ArtistItemComponent } from './../../components/artist-item/artist-item.component';
import { TopArtistsComponent } from './../../components/top-artists/top-artists.component';
import { RecenteResearchComponent } from './../../components/recente-research/recente-research.component';
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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftBarComponent,
    MenuButtonComponent,
    FooterUserComponent,
    HomeComponent,
    TopArtistComponent,
    RightBarComponent,
    RecenteResearchComponent,
    TopArtistsComponent,
    ArtistItemComponent,
    PlayerCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})

export class PlayerModule { }
