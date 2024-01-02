import { Routes } from "@angular/router";
import { userIsOnResolver } from "./resolvers/userIsOn.resolver";

export const AppRotas: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule),
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    resolve: {
      userIsOn: userIsOnResolver,
    }
  },
]