import { Component, OnInit, ViewChild } from '@angular/core';
import { Headline } from '../headline';
import { NewsHeadlinesComponent } from '../news-headlines/news-headlines.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild (NewsHeadlinesComponent) childNewsHeadlines!:NewsHeadlinesComponent
  articles: Array<Headline> = []
  constructor() { }

  ngOnInit(): void {
  }

  getArticles(articles:Headline[]) {
    this.articles = articles
  }

}
