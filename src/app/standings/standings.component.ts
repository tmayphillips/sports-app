import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Game } from '../game';
import { Headline } from '../headline';
import { Team } from '../team';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  sport:string | null = ''
  sportQuery:string | null = ''
  teams:Team[] = []
  games:Game[] = []
  articles: Array<Headline> = []
  conference:string = 'AFC'
  nflDivisions:string[] = ['East', 'West', 'North', 'South']
  nbaEasternDivisions:string[] = ['Atlantic', 'Central', 'Southeast']
  nbaWesternDivisions:string[] = ['Pacific', 'Southwest', 'Northwest']
  mlbDivisions:string[] = ['East', 'Central', 'West']

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.sportQuery = this.sport
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.sport = this.route.snapshot.paramMap.get('sport')
        this.sportQuery = this.sport
      }
    )
    if (this.sport==='nba') {
      this.conference = "Eastern"
    } 
    if (this.sport==='mlb') {
      this.conference = "AL"
    }
  }

  toggleConf(conf:string) {
   this.conference = conf;
   console.log(this.conference)
   console.log(this.teams)
  }

  getTeams(teams:Team[]) {
    this.teams = teams
    console.log(this.teams)
  }

  getArticles(articles:Headline[]) {
    this.articles = articles
  }

  getArray():string[] {
    if (this.conference === 'Eastern') {
      return this.nbaEasternDivisions
    } else if (this.conference === 'Western') {
      return this.nbaWesternDivisions
    } else {
      return this.nflDivisions
    }

  }
}
