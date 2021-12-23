import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Team } from '../team';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Output() newsEvent = new EventEmitter<Team>()
  rawTeamsArr:string[] = []
  teams:Team[] = []
  constructor(private scheduleService:ScheduleService) { }

  ngOnInit(): void {
    this.getTeams()
  }

  getTeams() {
    this.scheduleService
      .getNflTeams()
      .then((resp:any) => {
        this.rawTeamsArr.push(...resp);
        console.log(this.rawTeamsArr)
        this.createTeamsArr()
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
  }

  // sendTeamsInfo() {
  //   this.newsEvent.emit(this.teams)
  // }

}
