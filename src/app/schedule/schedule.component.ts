import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Game } from '../game';

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
  games:Game[] = []

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
        console.log(this.schedule)
      })
  }

  getScoresArray() {
    let scheduleArray:any = this.schedule
    for (let gameObj of scheduleArray) {
      let game:Game = { 
        season: gameObj.Season,
        week: gameObj.Week,
        dateTime: gameObj.DateTime,
        homeTeam: gameObj.HomeTeam,
        homeTeamID: gameObj.HomeTeamID,
        homeScore: gameObj.HomeScore,
        awayTeam: gameObj.AwayTeam,
        awayScore: gameObj.AwayScore,
        awayTeamID: gameObj.AwayTeamID,
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

}
