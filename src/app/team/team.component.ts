import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { Team } from '../team';
import { Headline } from '../headline';
import { Game } from '../game';
import { filter } from 'rxjs';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Output() teamsEvent = new EventEmitter<Team[]>()
  @ViewChild (ScheduleComponent) childSchedule!:ScheduleComponent

  rawTeamsArr:string[] = []
  rawStandingsArr:any[] = []
  teams:Team[] = []
  teamID:number | null = 0
  sport:string | null = ''
  teamQuery:string | null = 'sport'
  season:string|{} = ''
  year:string = ''
  articles:Headline[] = []
  games:Game[] = []
  teamIndex:number = -1
  sportQuery:string | null = ''
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService:ScheduleService
    ) { }

  ngOnInit(): void {
    this.teamID = Number(this.route.snapshot.paramMap.get('teamID'))
    this.teamQuery = this.route.snapshot.paramMap.get('teamName')
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.sportQuery = this.sport
    this.getCurrent(this.sport)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.teamID = Number(this.route.snapshot.paramMap.get('teamID'))
        this.teamQuery = this.route.snapshot.paramMap.get('teamName')
        this.sport = this.route.snapshot.paramMap.get('sport')
        this.sportQuery = this.sport
        console.log('router event', this.sport, this.teamID)
        // this.childSchedule.getCurrent(this.sportQuery)
        this.getCurrent(this.sport)
      }
    )
  }

  getCurrent(sport:string|null) {
    this.season = ''
    this.scheduleService
    .getCurrent(sport)
    .then((resp:any) => {
      this.season = resp
      this.getTeams()
    })
  }

  getTeams() {
    this.scheduleService
      .getTeams(this.sport)
      .then((resp:any) => {
        this.rawTeamsArr = resp;
        this.getStandings()
      })
  }
  
  getStandings() {
    this.scheduleService
      .getStandings(this.sport, this.season)
      .then((resp:any) => {
        this.rawStandingsArr = resp;
        this.createTeamsArr()
      })
  }
  
  createTeamsArr() {
    let teamsArray:any = this.rawTeamsArr
    this.teams = []
    for (let teamObj of teamsArray) {
      if(this.sport==='mlb') {
        let team:Team = {
          key: teamObj.Key,
          teamID: teamObj.TeamID,
          city: teamObj.City,
          name: teamObj.Name,
          conference: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].League,
          division: teamObj.Division,
          wins: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].Wins,
          losses: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].Losses,
          ties: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].Ties,
          conferenceRank: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceRank,
          conferenceWins: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceWins,
          conferenceLosses: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceLosses,
          conferenceTies: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceTies,
          divisionRank: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionRank,
          divisionWins: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionWins,
          divisionLosses: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionLosses,
          divisionTies: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionTies,
          fullName: teamObj.FullName,
          stadiumID: teamObj.StadiumID,
          primaryColor: teamObj.PrimaryColor,
          secondaryColor: teamObj.SecondaryColor,
          wikipediaLogoUrl: teamObj.WikipediaLogoUrl,
          wikipediaWordMarkUrl: teamObj.WikipediaWordMarkUrl
        }
        this.teams.push(team)
      } else {
        let team:Team = {
          key: teamObj.Key,
          teamID: teamObj.TeamID,
          city: teamObj.City,
          name: teamObj.Name,
          conference: teamObj.Conference,
          division: teamObj.Division,
          wins: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].Wins,
          losses: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].Losses,
          ties: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].Ties,
          conferenceRank: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceRank,
          conferenceWins: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceWins,
          conferenceLosses: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceLosses,
          conferenceTies: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].ConferenceTies,
          divisionRank: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionRank,
          divisionWins: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionWins,
          divisionLosses: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionLosses,
          divisionTies: this.rawStandingsArr[this.rawStandingsArr.findIndex(x => x.TeamID === teamObj.TeamID )].DivisionTies,
          fullName: teamObj.FullName,
          stadiumID: teamObj.StadiumID,
          primaryColor: teamObj.PrimaryColor,
          secondaryColor: teamObj.SecondaryColor,
          wikipediaLogoUrl: teamObj.WikipediaLogoUrl,
          wikipediaWordMarkUrl: teamObj.WikipediaWordMarkUrl
        }
        this.teams.push(team)
      }
    }
    if (this.sport === 'mlb') {
      this.teams.sort((a,b)=> {
        return a.divisionRank - b.divisionRank
      })
    } else {
      this.teams.sort((a,b)=> {
        return a.conferenceRank - b.conferenceRank
      })
    }
    
    this.teamIndex = this.teams.findIndex(x => x.teamID === this.teamID )
    this.sendTeamsInfo()
  }

  sendTeamsInfo() {
    this.teamsEvent.emit(this.teams)
  }

  getArticles(articles:Headline[]) {
    this.articles = articles
  }

  getGames(games:Game[]) {
    this.games = games
  }
}