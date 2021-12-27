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

  ngOnInit(): void {
    this.getCurrent(this.sport)
  }

  getCurrent(sport:string|null) {
      this.season = ''
      console.log(sport)
      this.scheduleService
      .getCurrent(sport)
      .then((resp:any) => {
        console.log(resp)
        this.season = resp
        console.log(this.season)
        this.getScheduleArray(this.sport, this.season)
      })
  }

  // getCurrentSeason(sport:string|null) {
  //   if(sport==='nfl') {
  //     this.scheduleService
  //     .getNflCurrent('Season')
  //     .then((resp:any) => {
  //       this.season = resp
  //       this.getScheduleArray(this.season)
  //     })
  //   }
  // }

  getScheduleArray(sport:string|null, season:string|{}) {
    this.scheduleService
      .getSchedule(this.sport, season)
      .then((resp:any) => {
        console.log(resp)
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
    for (let teamObj of teamsArray) {
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
    console.log('teams:', this.teams)
    this.getScoresArray()
  }

  getScoresArray() {
    let scheduleArray:any = this.schedule
    console.log(scheduleArray)
    this.games = []
    for (let gameObj of scheduleArray) {
      if(!gameObj.isOver) {
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
    }
    console.log(this.games)
    this.sendGameList()
  }

  getTeamInfo(teams:Team[]) {
    this.teams = teams
  }
  
  sendGameList() {
    this.gamesEvent.emit(this.games)
  }

}
