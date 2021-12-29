import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerStatsService } from '../player-stats.service';
import { Player } from '../players';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnInit {
  @Input() playerID:number = 0
  @Input() type:string = 'FantasyPointsYahoo'

  ngOnChanges(changes:SimpleChanges) {
    this.playerStats = []
    this.getSeason()
  }
  player:Player = new Player(0,'','','','')
  season:number = 0;
  week:number = 0;
  playerStats:any[] = [];
  weeks:string[] = [];
  fantasyPoints:number[] = [];
  title:string = 'Fantasy Points by Week'

  constructor(
    private playerStatsService:PlayerStatsService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  public graph = {
    data: [{
      x: this.weeks,
      y: this.fantasyPoints,
      type: 'scatter',
      mode: 'lines+markers', 
      marker: {color: 'black'}
    }],
    layout: {
      title: this.title,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      // gridColor: 'transparent'
    }
  }
  
  ngOnInit(): void {
    this.getWeek();
    this.getSeason();
  }

  getSeason() {
    this.playerStatsService
      .getCurrent('Season')
      .then((resp:any) => {
        this.season = resp
        this.getStats()
      })
  }

  getWeek() {
    this.playerStatsService
      .getCurrent('Week')
      .then((resp:any) => {
        this.week = resp;
      })
  }

  getStats() {
    this.playerStatsService
      .getPlayerStats(this.season, this.playerID)
      .then((resp:any) => {
        this.playerStats.push(resp)
        this.getData()
      }).catch(console.log)
  }

  getData() {
    let playerStats:any[] = this.playerStats[0]
    this.weeks = [];
    this.fantasyPoints = [];
    let tempWeek:string[] = []
    let tempData:number[] = []
    let type:string = this.type
    playerStats.forEach(element => {
      tempWeek.unshift(`Wk ${element.Week}`);
      tempData.unshift(element[type]);
    })
    this.weeks = tempWeek;
    this.fantasyPoints = tempData;
    this.graph = {
      data: [{
        x: this.weeks,
        y: this.fantasyPoints,
        type: 'scatter',
        mode: 'lines+markers', 
        marker: {color: 'black'}
      }],
      layout: {
        title: this.title,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
      }
    }
  }

}
