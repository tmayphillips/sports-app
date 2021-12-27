import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsService } from '../news.service';
import { Headline } from '../headline';

@Component({
  selector: 'news-headlines',
  templateUrl: './news-headlines.component.html',
  styleUrls: ['./news-headlines.component.scss']
})
export class NewsHeadlinesComponent implements OnInit {

  @Input() query:string = ''
  @Output() newsEvent = new EventEmitter<Headline>()
  @Output() articlesEvent = new EventEmitter<Headline[]>()

  constructor(private newsService:NewsService) { }

  articles: Array<Headline> = []
  count:number = 1

  ngOnInit(): void {
    this.getNews(this.query)
   
  }

  getNews(query:string) {
    this.newsService
      .getNewsQuery(query)
      .then((resp:any) => {
        this.articles.push(...resp.articles);
        this.sendNewsItem()
        this.sendArticles()
      })
  }

  sendNewsItem() {
    this.newsEvent.emit(this.articles[1])
  }

  sendArticles() {
    this.articlesEvent.emit(this.articles)
  }

}
