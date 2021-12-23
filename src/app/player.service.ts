import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  NFL_API_KEY = '72b3ff18e83e404bb5b7c04990249801';
  NBA_API_KEY = '13a658de98874317a0ee4749c2f34d41'
  MLB_API_KEY = '782d2e12bb5c46fe934b8b5a908ce7a4'
  playerArr:string[] = []
  timeframe:string = ''
  nflPlayersUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Players?key=${this.NFL_API_KEY}`
  mlbPlayersUrl = `https://api.sportsdata.io/v3/mlb/scores/json/Players?key=${this.MLB_API_KEY}`
  nbaPlayersUrl = `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${this.NBA_API_KEY}`
  nflCurrentUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Current`
  mlbCurrentUrl = `https://api.sportsdata.io/v3/mlb/scores/json/CurrentSeason`
  nbaCurrentUrl = `https://api.sportsdata.io/v3/nba/scores/json/CurrentSeason`
  nflStatsUrl = `https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsBySeason/`
  mlbStatsUrl = `https://api.sportsdata.io/v3/mlb/stats/json/PlayerGameStatsBySeason/`
  nbaStatsUrl = `https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsBySeason/`

  constructor(private http:HttpClient) { }

  public getNflPlayers() {
    return new Promise((resolve,reject) => {
        this.http.get(this.nflPlayersUrl).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getMlbPlayers() {
    return new Promise((resolve,reject) => {
        this.http.get(this.mlbPlayersUrl).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getNbaPlayers() {
    return new Promise((resolve,reject) => {
        this.http.get(this.nbaPlayersUrl).subscribe(
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

  public getNflPlayerStats(season:number, id:number) {
    return new Promise((resolve,reject) => {
        this.http.get(`${this.nflStatsUrl}/${season}/${id}/all?key=${this.NFL_API_KEY}`).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

  public getMlbPlayerStats(season:number, id:number) {
    return new Promise((resolve,reject) => {
      this.http.get(`${this.mlbStatsUrl}/${season}/${id}/all?key=${this.MLB_API_KEY}`).subscribe(
          (res) => {
              resolve(res);
          }, (err) => {
              reject(err)
          }
      )
    })
  }

  public getNbaPlayerStats(season:number, id:number) {
    return new Promise((resolve,reject) => {
      this.http.get(`${this.nbaStatsUrl}/${season}/${id}/all?key=${this.NBA_API_KEY}`).subscribe(
          (res) => {
              resolve(res);
          }, (err) => {
              reject(err)
          }
      )
    })
  }

}
