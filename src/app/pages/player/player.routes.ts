import { MusicsListComponent } from './../musics-list/musics-list.component';
import { HomeComponent } from './../home/home.component';
import { Routes } from "@angular/router";
import { PlayerComponent } from './player.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'list/:type/:id',
      component: MusicsListComponent
    }
  ]
  }
]