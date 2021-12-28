import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Game } from '../game';
import { Headline } from '../headline';
import { ScheduleService } from '../schedule.service';
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
  conference:string = 'afc'

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService:ScheduleService
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
  }

  toggleConf(conf:string) {
   this.conference = conf;
   console.log(this.conference)
   console.log(this.teams)
  }

  getTeams(teams:Team[]) {
    this.teams = teams
  }

  getArticles(articles:Headline[]) {
    this.articles = articles
  }
}
