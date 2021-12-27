import { Component, OnInit, ViewChild } from '@angular/core';
import { Headline } from '../headline';
import { Game } from '../game';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NewsHeadlinesComponent } from '../news-headlines/news-headlines.component';
import { filter } from 'rxjs';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'nfl',
  templateUrl: './nfl.component.html',
  styleUrls: ['./nfl.component.scss']
})
export class NflComponent implements OnInit {
  @ViewChild (NewsHeadlinesComponent) childNewsHeadlines!:NewsHeadlinesComponent
  @ViewChild (ScheduleComponent) childSchedule!:ScheduleComponent

  sportQuery:string | null = ''
  articles: Array<Headline> = []
  headline:any = {}
  games:Game[] = []
  sport:string | null = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngAfterViewInit() {
    console.log('ngAfter sport', this.sport)
    // this.childNewsHeadlines.getNews(this.sport)
    // this.childSchedule.getCurrent(this.sport)
  }

  ngOnChange(): void {
    console.log('onChange')
  }

  ngOnInit(): void {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.sportQuery = this.sport
    console.log('sport page: ')

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.sport = this.route.snapshot.paramMap.get('sport')
        this.sportQuery = this.sport
        console.log('router event', this.sport)
        this.childNewsHeadlines.getNews(this.sport)
        this.childSchedule.getCurrent(this.sport)
      }
    )
  }

  getHeadline(articles:Headline[]) {
    console.log('headline', articles)
    this.headline = articles[1]
    this.articles = articles
  }

  getArticles(articles:Headline[]) {
    console.log('articles', articles)
    this.articles = articles
  }

  getGames(games:Game[]) {
    this.games = games
  }

}
