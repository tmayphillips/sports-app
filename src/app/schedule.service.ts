import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  nflCurrentUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Current`
  mlbCurrentUrl = `https://api.sportsdata.io/v3/mlb/scores/json/CurrentSeason`
  nbaCurrentUrl = `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason`
  nflScheduleUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Scores/`
  mlbScheduleUrl = `https://api.sportsdata.io/v3/mlb/scores/json/Scores/`
  nbaScheduleUrl = `https://api.sportsdata.io/v3/nba/scores/json/Scores/`
  nflTeamsUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Teams`
  nflStandingsUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/`
  NFL_API_KEY = '72b3ff18e83e404bb5b7c04990249801';
  NBA_API_KEY = '13a658de98874317a0ee4749c2f34d41'
  MLB_API_KEY = '782d2e12bb5c46fe934b8b5a908ce7a4'
  timeframe:string = ''
  season:string = ''

  constructor(private http:HttpClient) { }


  public getNflCurrent(currentTimeframe:string) {
    this.timeframe = currentTimeframe;
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflCurrentUrl}${this.timeframe}?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNflSchedule(currentSeason:string) {
    this.season = currentSeason;
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflScheduleUrl}${this.season}?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getMlbCurrent() {
    return new Promise((resolve,reject) => {
        this.http.get(`${this.mlbCurrentUrl}?key=${this.MLB_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getMlbSchedule(currentSeason:string) {
    this.season = currentSeason;
    return new Promise((resolve,reject) => {
        this.http.get(`${this.mlbScheduleUrl}${this.season}?key=${this.MLB_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNbaCurrent() {
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nbaCurrentUrl}?key=${this.NBA_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNbaSchedule(currentSeason:string) {
    this.season = currentSeason;
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nbaScheduleUrl}${this.season}?key=${this.NBA_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNflTeams() {
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflTeamsUrl}${this.season}?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNflStandings() {
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflStandingsUrl}${this.season}?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

}
