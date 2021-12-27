import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { Team } from '../team';
import { Headline } from '../headline';

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
  teamID:string | null = '0'
  sport:string = 'nfl'
  teamQuery:string | null = 'sport'
  season:string = ''
  articles:Headline[] = []
  
  constructor(
    private route: ActivatedRoute,
    private scheduleService:ScheduleService
    ) { }

  ngOnInit(): void {
    this.teamID = this.route.snapshot.paramMap.get('teamID')
    this.teamQuery = this.route.snapshot.paramMap.get('teamName')
    // this.route.queryParams.subscribe(params => {
    //   this.teamID = params['teamID']
    //   this.teamQuery = params['teamName'];
    // });
    this.getCurrentSeason(this.sport)
    console.log(this.teamID)
    console.log(this.teamQuery)
  }

  getCurrentSeason(sport:string) {
    if(sport==='nfl') {
      this.scheduleService
      .getNflCurrent('Season')
      .then((resp:any) => {
        this.season = resp
        console.log('season', this.season)
        this.getTeams()
      })
    }
  }

  getTeams() {
    this.scheduleService
      .getNflTeams()
      .then((resp:any) => {
        this.rawTeamsArr.push(...resp);
        console.log('rawTeamsArr', this.rawTeamsArr)
        this.getStandings()
      })
  }
  
  getStandings() {
    this.scheduleService
      .getNflStandings(this.season)
      .then((resp:any) => {
        this.rawStandingsArr.push(...resp);
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
    console.log('teams', this.teams)
    this.sendTeamsInfo()
  }

  sendTeamsInfo() {
    this.teamsEvent.emit(this.teams)
  }

  getArticles(articles:Headline[]) {
    this.articles = articles
  }
}