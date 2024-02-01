import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.scss']
})
export class ArtistItemComponent implements OnInit {

  @Input() imageSrc: string = '';
  @Output() click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }
}
