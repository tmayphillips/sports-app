import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NewsService } from '../news.service';
import { Headline } from '../headline';
import { filter } from 'rxjs';

@Component({
  selector: 'news-headlines',
  templateUrl: './news-headlines.component.html',
  styleUrls: ['./news-headlines.component.scss']
})
export class NewsHeadlinesComponent implements OnInit {

  @Input() query:string | null = ''
  @Output() newsEvent = new EventEmitter<Headline[]>()
  @Output() articlesEvent = new EventEmitter<Headline[]>()

  constructor(
    private router: Router,
    private newsService:NewsService
  ) { }

  articles: Array<Headline> = []
  count:number = 1

  ngOnInit(): void {
    this.getNews(this.query)

    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
    //   () => {
    //     this.getNews(this.query)
    //   }
    // )
  }

  ngOnChange(): void {
    console.log('onChange')
  }

  getNews(query:string | null) {
    // if (query === 'mlb') {
    //   query = 'mlb baseball'
    // }
    // if (query ==='nfl') {
    //   query = 'nfl football'
    // }
    // if (query === 'nba') {
    //   query = 'nba basketball'
    // }
    this.articles = []
    this.newsService
      .getNewsQuery(query)
      .then((resp:any) => {
        console.log(resp)
        this.articles = resp.articles;
        this.sendNewsItem()
        this.sendArticles()
      })
  }

  sendNewsItem() {
    this.newsEvent.emit(this.articles)
  }

  sendArticles() {
    this.articlesEvent.emit(this.articles)
  }

}
