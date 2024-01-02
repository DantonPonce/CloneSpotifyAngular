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
    FooterUserComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})

export class PlayerModule { }
