import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  NFL_API_KEY:string = '72b3ff18e83e404bb5b7c04990249801';
  NBA_API_KEY:string = '13a658de98874317a0ee4749c2f34d41'
  MLB_API_KEY:string = '782d2e12bb5c46fe934b8b5a908ce7a4'
  API_KEY:string = ''
  playerArr:string[] = []
  timeframe:string = ''
  nflPlayersUrl:string = `https://api.sportsdata.io/v3/nfl/scores/json/Players?key=${this.NFL_API_KEY}`
  mlbPlayersUrl:string = `https://api.sportsdata.io/v3/mlb/scores/json/Players?key=${this.MLB_API_KEY}`
  nbaPlayersUrl:string = `https://api.sportsdata.io/v3/nba/scores/json/Players?key=${this.NBA_API_KEY}`
  nflStatsUrl:string = `https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsBySeason/`
  mlbStatsUrl:string = `https://api.sportsdata.io/v3/mlb/stats/json/PlayerGameStatsBySeason/`
  nbaStatsUrl:string = `https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsBySeason/`

  constructor(private http:HttpClient) { }

  public getPlayers(sport:string|null) {
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
    let url = `https://api.sportsdata.io/v3/${sport}/scores/json/Players?key=${this.API_KEY}`
    return new Promise((resolve,reject) => {
        this.http.get(url).subscribe(
            (res) => {
                resolve(res);
            }, (err) => {
                reject(err)
            }
        )
    })
  }

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
