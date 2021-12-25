import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Team } from '../team';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Output() teamsEvent = new EventEmitter<Team[]>()
  rawTeamsArr:string[] = []
  rawStandingsArr:any[] = []
  teams:Team[] = []
  constructor(
    private scheduleService:ScheduleService
    ) { }

  ngOnInit(): void {
    this.getTeams()
  }

  getTeams() {
    this.scheduleService
      .getNflTeams()
      .then((resp:any) => {
        this.rawTeamsArr.push(...resp);
        this.getStandings()
        console.log(this.rawTeamsArr)
      })
  }
  
  getStandings() {
    this.scheduleService
      .getNflStandings()
      .then((resp:any) => {
        this.rawStandingsArr.push(...resp);
        this.createTeamsArr()
        console.log(this.rawStandingsArr)
      })
  }
  
  createTeamsArr() {
    let teamsArray:any = this.rawTeamsArr
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
    console.log(this.teams)
    this.sendTeamsInfo()
  }

  sendTeamsInfo() {
    this.teamsEvent.emit(this.teams)
  }

}
