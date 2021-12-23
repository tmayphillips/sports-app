import { Component, OnInit, Input } from '@angular/core';
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
        homeTeam: gameObj.HomeTeam,
        homeTeamID: gameObj.HomeTeamID,
        homeScore: gameObj.HomeScore,
        homeImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.HomeTeamID )].wikipediaLogoUrl,
        awayTeam: gameObj.AwayTeam,
        awayScore: gameObj.AwayScore,
        awayTeamID: gameObj.AwayTeamID,
        awayImg: this.teams[this.teams.findIndex(x => x.teamID === gameObj.AwayTeamID )].wikipediaLogoUrl,
        hasStarted: gameObj.HasStarted,
        isInProgress: gameObj.IsInProgress,
        isOver: gameObj.IsOver,
        stadium: gameObj.StadiumDetails.Name, 
        stadiumCity: gameObj.StadiumDetails.City

      }
      this.games.push(game)
  
    }
    console.log(this.games)
  }

  getTeamInfo(teams:Team[]) {
    this.teams = teams
    console.log(this.teams)
  }


}
