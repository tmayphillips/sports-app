import { Time } from "@angular/common";

export interface Game {
    season:number,
    week:number,
    awayScore:number,
    awayTeam:string,
    awayTeamID:string,
    awayImg:string,
    dateTime:string,
    longDate:Date,
    date:number,
    day:string,
    month:string,
    homeScore:number,
    homeTeam:string,
    homeTeamID:string,
    homeImg:string,
    stadium:string,
    stadiumCity:string,
    hasStarted:boolean,
    isInProgress:boolean,
    isOver:boolean
}