import { Component, OnInit, ViewChild } from '@angular/core';
import { Headline } from '../headline';
import { NewsHeadlinesComponent } from '../news-headlines/news-headlines.component';
import { Game } from '../game';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild (NewsHeadlinesComponent) childNewsHeadlines!:NewsHeadlinesComponent
  articles: Array<Headline> = []
  headline:any = {}
  sportQuery = 'sports'
  nflQuery = 'nfl'
  nbaQuery = 'nba'
  games:Game[] = []
  constructor() { }

  ngOnInit(): void {
  }

  getArticles(articles:Headline[]) {
    for(let i = 0; i < articles.length; i++) {
      if (articles[i].image_url) {
        this.headline = articles[i]
        break;
      }
    }
    this.articles = articles
    console.log(this.articles)
  }

  getGames(games:Game[]) {
    this.games = games
  }

}
