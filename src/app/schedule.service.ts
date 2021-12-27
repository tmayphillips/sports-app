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
  API_KEY = ''
  timeframe:string = ''
  season:string = ''
  gameInfo:string = ''

  constructor(private http:HttpClient) { }


  public getCurrent(sport:string|null) {
    switch (sport) {
      case 'nfl':
        this.API_KEY = '72b3ff18e83e404bb5b7c04990249801';
        break;
      case 'mlb':
        this.API_KEY = '782d2e12bb5c46fe934b8b5a908ce7a4';
        break;
      case 'nba':
        this.API_KEY = '13a658de98874317a0ee4749c2f34d41';
        break;
    }

    let currentUrl = `https://api.sportsdata.io/v3/${sport}/scores/json/CurrentSeason?key=${this.API_KEY}`
    console.log('currentUrl', currentUrl)
    return new Promise((resolve,reject) => {
        this.http.get(currentUrl).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getSchedule(sport:string|null, currentSeason:any) {
    switch (sport) {
      case 'nfl':
        this.API_KEY = '72b3ff18e83e404bb5b7c04990249801';
        this.season = currentSeason;
        this.gameInfo = 'Scores'
        break;
      case 'mlb':
        this.API_KEY = '782d2e12bb5c46fe934b8b5a908ce7a4';
        this.season = currentSeason.Season
        this.gameInfo = 'Games'
        break;
      case 'nba':
        this.API_KEY = '13a658de98874317a0ee4749c2f34d41';
        this.season = currentSeason.Season
        this.gameInfo = 'Games'
        break;
    }
    
    console.log('getSchedule', this.season)
    let scheduleUrl = `https://api.sportsdata.io/v3/${sport}/scores/json/${this.gameInfo}/${this.season}?key=${this.API_KEY}`
    return new Promise((resolve,reject) => {
        this.http.get(scheduleUrl).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getStandings(sport:string|null, currentSeason:any) {

    switch (sport) {
      case 'nfl':
        this.API_KEY = '72b3ff18e83e404bb5b7c04990249801';
        this.season = currentSeason;
        break;
      case 'mlb':
        this.API_KEY = '782d2e12bb5c46fe934b8b5a908ce7a4';
        this.season = currentSeason.Season
        break;
      case 'nba':
        this.API_KEY = '13a658de98874317a0ee4749c2f34d41';
        this.season = currentSeason.Season
        break;
    }

    return new Promise((resolve,reject) => {
      let standingsUrl = `https://api.sportsdata.io/v3/${sport}/scores/json/Standings/${this.season}?key=${this.API_KEY}`
        this.http.get(standingsUrl).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getTeams(sport:string|null) {
    switch (sport) {
      case 'nfl':
        this.API_KEY = '72b3ff18e83e404bb5b7c04990249801';
        break;
      case 'mlb':
        this.API_KEY = '782d2e12bb5c46fe934b8b5a908ce7a4';
        break;
      case 'nba':
        this.API_KEY = '13a658de98874317a0ee4749c2f34d41';
        break;
    }
    let teamsUrl = `https://api.sportsdata.io/v3/${sport}/scores/json/Teams?key=${this.API_KEY}`
    return new Promise((resolve,reject) => {
        this.http.get(teamsUrl).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }


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

  // public getNflSchedule(currentSeason:string) {
  //   this.season = currentSeason;
  //   return new Promise((resolve,reject) => {
  //       this.http.get(`${this.nflScheduleUrl}${this.season}?key=${this.NFL_API_KEY}`).subscribe(
  //           (res) => {
  //               resolve(res);
  //           }, (err) => {
  //               reject(err)
  //           }
  //       )
  //   })
  // }

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

  // public getMlbSchedule(currentSeason:string) {
  //   this.season = currentSeason;
  //   return new Promise((resolve,reject) => {
  //       this.http.get(`${this.mlbScheduleUrl}${this.season}?key=${this.MLB_API_KEY}`).subscribe(
  //           (res) => {
  //               resolve(res);
  //           }, (err) => {
  //               reject(err)
  //           }
  //       )
  //   })
  // }

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

  // public getNbaSchedule(currentSeason:string) {
  //   this.season = currentSeason;
  //   return new Promise((resolve,reject) => {
  //       this.http.get(`${this.nbaScheduleUrl}${this.season}?key=${this.NBA_API_KEY}`).subscribe(
  //           (res) => {
  //               resolve(res);
  //           }, (err) => {
  //               reject(err)
  //           }
  //       )
  //   })
  // }

  public getNflTeams() {
    console.log(`${this.nflTeamsUrl}?key=${this.NFL_API_KEY}`)
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflTeamsUrl}?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNflStandings(season:string) {
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflStandingsUrl}${season}?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

}
