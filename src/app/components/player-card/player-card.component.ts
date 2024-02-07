import { Subscription } from 'rxjs';
import { PlayerService } from './../../services/player.service';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from 'src/app/Interfaces/IMusics';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  currentMusic: IMusic = newMusic()
  subs: Subscription[] = [];
  prevIcon = faStepBackward;
  nextIcon = faStepForward;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.currentMusic = music;
    })

    this.subs.push(sub);
  }

  prevMusic() {
    this.playerService.prevMusic();
  }

  nextMusic() {
    this.playerService.nextMusic();
  }


}
