import { Time } from "@angular/common";

export interface Game {
    season:number,
    week:number,
    awayScore:number,
    awayTeamAbbr:string,
    awayTeam:string,
    awayTeamID:string,
    awayImg:string,
    awayWins:number,
    awayLosses:number
    dateTime:string,
    longDate:Date,
    date:number,
    day:string,
    month:string,
    homeScore:number,
    homeTeamAbbr:string,
    homeTeam:string,
    homeTeamID:string,
    homeImg:string,
    homeWins:number,
    homeLosses:number,
    hasStarted:boolean,
    isInProgress:boolean,
    isOver:boolean,
    channel:string
}