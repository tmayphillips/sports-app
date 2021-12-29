import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Game } from '../game';
import { Team } from '../team';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Headline } from '../headline';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() sport:string | null = ''
  @Output() gamesEvent = new EventEmitter<Game[]>()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService:ScheduleService
  ) { }
  sportQuery:string | null = ''
  season:string|{} = ''
  schedule:string[] = []
  date:string = ''
  unfinishedGames:Game[] = []
  games:Game[] = []
  teams:Team[] = []
  rawTeamsArr:string[] = []
  rawStandingsArr:any[] = []
  weekday:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  monthNames:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  articles: Array<Headline> = []
  
  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.sportQuery = this.sport
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.sport = this.route.snapshot.paramMap.get('sport')
        this.sportQuery = this.sport
      }
    )
    this.getCurrent(this.sport)
  }

  getCurrent(sport:string|null) {
      this.season = ''
      console.log(sport)
      this.scheduleService
      .getCurrent(sport)
      .then((resp:any) => {
        this.season = resp
        this.getScheduleArray(this.sport, this.season)
      })
  }

  getScheduleArray(sport:string|null, season:string|{}) {
    this.scheduleService
      .getSchedule(this.sport, season)
      .then((resp:any) => {
        this.schedule= resp;
        this.getTeams()
      })
  }

  getTeams() {
    this.rawTeamsArr = []
    this.scheduleService
      .getTeams(this.sport)
      .then((resp:any) => {
        this.rawTeamsArr = resp;
        this.getStandings()
      })
  }
  
  getStandings() {
    this.rawStandingsArr = []
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
    console.log(this.sport)
    for (let teamObj of teamsArray) {
      if(this.sport==='mlb') {
        let team:Team = {
          key: teamObj.Key,
          teamID: teamObj.TeamID,
          city: teamObj.City,
          name: teamObj.Name,
          conference: teamObj.League,
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
    this.getScoresArray()
  }

  getScoresArray() {
    let scheduleArray:any = this.schedule
    this.games = []
    for (let gameObj of scheduleArray) {
      if(this.sport === 'nfl') {
        // console.log(this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].name)
        let game:Game = { 
          season: gameObj.Season,
          week: gameObj.Week,
          dateTime: gameObj.DateTime,
          longDate: new Date(gameObj.DateTime),
          date: new Date(gameObj.DateTime).getDate(),
          day: this.weekday[new Date(gameObj.DateTime).getDay()],
          month: this.monthNames[new Date(gameObj.DateTime).getMonth()],
          homeTeamAbbr: gameObj.HomeTeam,
          homeTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].name ?? "",
          homeTeamID: gameObj.HomeTeamID,
          homeScore: gameObj.HomeScore,
          homeImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wikipediaLogoUrl,
          homeWins: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wins,
          homeLosses: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].losses,
          awayTeamAbbr: gameObj.AwayTeam,
          awayTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].name,
          awayScore: gameObj.AwayScore,
          awayTeamID: gameObj.AwayTeamID,
          awayImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wikipediaLogoUrl,
          awayWins: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wins,
          awayLosses: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].losses,
          hasStarted: gameObj.HasStarted,
          isInProgress: gameObj.IsInProgress,
          isOver: gameObj.IsOver,
          channel: gameObj.Channel
        }
        this.games.push(game)
      }
      if(this.sport === 'nba') {
        let game:Game = { 
          season: gameObj.Season,
          week: gameObj.Week,
          dateTime: gameObj.DateTime,
          longDate: new Date(gameObj.DateTime),
          date: new Date(gameObj.DateTime).getDate(),
          day: this.weekday[new Date(gameObj.DateTime).getDay()],
          month: this.monthNames[new Date(gameObj.DateTime).getMonth()],
          homeTeamAbbr: gameObj.HomeTeam,
          homeTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].name ?? "",
          homeTeamID: gameObj.HomeTeamID,
          homeScore: gameObj.HomeTeamScore,
          homeImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wikipediaLogoUrl,
          homeWins: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wins,
          homeLosses: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].losses,
          awayTeamAbbr: gameObj.AwayTeam,
          awayTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].name,
          awayScore: gameObj.AwayTeamScore,
          awayTeamID: gameObj.AwayTeamID,
          awayImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wikipediaLogoUrl,
          awayWins: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wins,
          awayLosses: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].losses,
          hasStarted: gameObj.HasStarted,
          isInProgress: gameObj.IsInProgress,
          isOver: gameObj.IsOver,
          channel: gameObj.Channel
        }
        this.games.push(game)
      }
      if(this.sport === 'mlb') {
        let game:Game = { 
          season: gameObj.Season,
          week: gameObj.Week,
          dateTime: gameObj.DateTime,
          longDate: new Date(gameObj.DateTime),
          date: new Date(gameObj.DateTime).getDate(),
          day: this.weekday[new Date(gameObj.DateTime).getDay()],
          month: this.monthNames[new Date(gameObj.DateTime).getMonth()],
          homeTeamAbbr: gameObj.HomeTeam,
          homeTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].name ?? "",
          homeTeamID: gameObj.HomeTeamID,
          homeScore: gameObj.HomeTeamRuns,
          homeImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wikipediaLogoUrl,
          homeWins: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wins,
          homeLosses: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].losses,
          awayTeamAbbr: gameObj.AwayTeam,
          awayTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].name,
          awayScore: gameObj.AwayTeamRuns,
          awayTeamID: gameObj.AwayTeamID,
          awayImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wikipediaLogoUrl,
          awayWins: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wins,
          awayLosses: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].losses,
          hasStarted: gameObj.HasStarted,
          isInProgress: gameObj.IsInProgress,
          isOver: gameObj.IsOver,
          channel: gameObj.Channel
        }
        this.games.push(game)
      }
    }
    this.sendGameList()
  }

  getTeamInfo(teams:Team[]) {
    this.teams = teams
  }
  
  sendGameList() {
    this.gamesEvent.emit(this.games)
  }

  getArticles(articles:Headline[]) {
    this.articles = articles
  }
}
