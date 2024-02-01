import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recente-research',
  templateUrl: './recente-research.component.html',
  styleUrls: ['./recente-research.component.scss']
})
export class RecenteResearchComponent implements OnInit{

  recentsResearch = [
    "Top Brasil", "Top Global", "Esquenta Sertaneja",
    "Funk Hits", "Pagodeira"
  ]

  research: string = '';

  constructor(){}

  ngOnInit(): void {
  }

  setResearch(research: string){
    this.research = research;
  }

  search(){
    console.log("To do a research!");
  }

}
