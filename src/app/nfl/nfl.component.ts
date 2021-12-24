import { Component, OnInit } from '@angular/core';
import { Headline } from '../headline';
import { Game } from '../game';
import { NewsHeadlinesComponent } from '../news-headlines/news-headlines.component';

@Component({
  selector: 'nfl',
  templateUrl: './nfl.component.html',
  styleUrls: ['./nfl.component.scss']
})
export class NflComponent implements OnInit {
  sportQuery = 'nfl'
  headline:any = {}
  games:Game[] = []
  // @ViewChild(NewsHeadlinesComponent) child!:NewsHeadlinesComponent

  // @ViewChild(NewsHeadlinesComponent)
  //      private child = {} as NewsHeadlinesComponent;

  constructor() { 
  }

  ngOnInit(
  ): void {
    
    // this.child.sendNewsItem()
  }

  // ngAfterViewInit() {
  //   // child is set
  //   this.headline = this.child.getNews('nfl')
  //   console.log(this.headline)
  // }

  

  getHeadline(headline:Headline) {
    this.headline = headline
  }

  getGames(games:Game[]) {
    this.games = games
    console.log('games', this.games)
  }

}
