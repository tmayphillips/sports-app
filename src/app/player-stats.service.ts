import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {
  API_KEY = '72b3ff18e83e404bb5b7c04990249801';
  playerArr:string[] = []
  timeframe:string = ''
  playersUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Players?key=${this.API_KEY}`
  currentUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Current`
  statsUrl = `https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsBySeason/`

  constructor(private http:HttpClient) { }

  public stats:Array<any> = []
  public getPlayers() {
      return new Promise((resolve,reject) => {
          this.http.get(this.playersUrl).subscribe(
              (res) => {
                  resolve(res);
              }, (err) => {
                  reject(err)
              }
          )
      })
  }

  public getCurrent(currentTimeframe:string) {
      this.timeframe = currentTimeframe;
      return new Promise((resolve,reject) => {
          this.http.get(`${this.currentUrl}${this.timeframe}?key=${this.API_KEY}`).subscribe(
              (res) => {
                  resolve(res);
              }, (err) => {
                  reject(err)
              }
          )
      })
  }

  public getPlayerStats(season:number, id:number) {
      return new Promise((resolve,reject) => {
          this.http.get(`${this.statsUrl}/${season}/${id}/all?key=${this.API_KEY}`).subscribe(
              (res) => {
                  resolve(res);
              }, (err) => {
                  reject(err)
              }
          )
      })
  }
}
