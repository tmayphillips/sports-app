export interface Game {
    season:number,
    week:number,
    awayScore:number,
    awayTeam:string,
    awayTeamID:string,
    dateTime:string,
    homeScore:number,
    homeTeam:string,
    homeTeamID:string,
    stadium:string,
    stadiumCity:string,
    hasStarted:boolean,
    isInProgress:boolean,
    isOver:boolean
}