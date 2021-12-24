import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Game } from '../game';
import { Team } from '../team';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() sport:string = ''
  @Output() gamesEvent = new EventEmitter<Game[]>()
  constructor(private scheduleService:ScheduleService) { }
  season:string = ''
  schedule:string[] = []
  date:string = ''
  unfinishedGames:Game[] = []
  games:Game[] = []
  teams:Team[] = []
  weekday:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  monthNames:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  ngOnInit(): void {
    this.getCurrentSeason(this.sport)
  }

  getCurrentSeason(sport:string) {
    if(sport==='nfl') {
      this.scheduleService
      .getNflCurrent('Season')
      .then((resp:any) => {
        this.season = resp
        this.getScheduleArray(this.season)
      })
    }
  }

  getScheduleArray(season:string) {
    this.scheduleService
      .getNflSchedule(season)
      .then((resp:any) => {
        this.schedule.push(...resp);
        this.getScoresArray()
      })
  }

  getScoresArray() {
    let scheduleArray:any = this.schedule
    console.log(this.schedule)
    console.log("teams", this.teams)
    for (let gameObj of scheduleArray) {
      let game:Game = { 
        season: gameObj.Season,
        week: gameObj.Week,
        dateTime: gameObj.DateTime,
        longDate: new Date(gameObj.DateTime),
        date: new Date(gameObj.DateTime).getDate(),
        day: this.weekday[new Date(gameObj.DateTime).getDay()],
        month: this.monthNames[new Date(gameObj.DateTime).getMonth()],
        homeTeamAbbr: gameObj.HomeTeam,
        homeTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].name,
        homeTeamID: gameObj.HomeTeamID,
        homeScore: gameObj.HomeScore,
        homeImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wikipediaLogoUrl,
        awayTeamAbbr: gameObj.AwayTeam,
        awayTeam: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].name,
        awayScore: gameObj.AwayScore,
        awayTeamID: gameObj.AwayTeamID,
        awayImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wikipediaLogoUrl,
        hasStarted: gameObj.HasStarted,
        isInProgress: gameObj.IsInProgress,
        isOver: gameObj.IsOver,
        stadium: gameObj.StadiumDetails.Name, 
        stadiumCity: gameObj.StadiumDetails.City,
        channel: gameObj.Channel,
        forecastDescription: gameObj.ForecastDescription
      }
      this.games.push(game)
  
    }
    this.sendGameList()
  }

  getTeamInfo(teams:Team[]) {
    this.teams = teams
    console.log(this.teams)
  }
  
  sendGameList() {
    this.gamesEvent.emit(this.games)
  }

}
