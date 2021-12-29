import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { PlayerService } from '../player.service';
import { Player } from '../players';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  player:Player = new Player(0,'','','','')
  players: Array<any> = []
  query:string = ''
  playerID:number = 0
  selectedPlayer:string = ''
  playerSelected:boolean = false;
  sport:string | null = ''
  type:string = 'FantasyPoints'

  constructor(
    private playerService:PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.playerID = Number(this.route.snapshot.paramMap.get('playerID'))
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.sport = this.route.snapshot.paramMap.get('sport')
        this.playerID = Number(this.route.snapshot.paramMap.get('playerID'))
      }
    )
    this.getPlayerArray()
  }

  findPlayerObject(array:any, key:string, value:number) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

  getPlayerArray() {
    this.playerService
      .getPlayers(this.sport)
      .then((resp:any) => {
        this.players = resp;
        let playersArr = this.players
        console.log(playersArr)
        let playerIndex = this.players.findIndex(x => x.PlayerID === this.playerID )
        console.log(this.playerID, playerIndex)
        let obj = playersArr.find(obj => obj.PlayerID === this.playerID);
        let playerObj:{} = this.findPlayerObject(this.players, 'PlayerID', this.playerID)
        console.log(obj)
        this.onSelectPlayer(obj)
      })
  }



  onSelectPlayer(rawPlayer:any) {
    this.query = ''
    let fullTeam:string = ''
    let abbTeam:string = rawPlayer.Team  
    let teamsObj:any = {
      ARI:'Arizona Cardinals', 
      ATL:'Atlanta Falcons', 
      BAL:'Baltimore Ravens', 
      BUF:'Buffalo Bills', 
      CAR:'Carolina Panthers', 
      CHI:'Chicago Bears', 
      CIN:'Cincinnati Bengals', 
      CLE:'Cleveland Browns',
      DAL:'Dallas Cowboys',
      DEN:'Denver Broncos',
      DET:'Detroit Lions',
      GB:'Green Bay Packers',
      HOU:'Houston Texans',
      IND:'Indianapolis Colts',
      JAX:'Jacksonville Jaguars',
      KC:'Kansas City Chiefs',
      MIA:'Miami Dolphins',
      MIN:'Minnesota Vikings',
      NE:'New England Patriots',
      NO:'New Orleans Saints',
      NYG:'NY Giants',
      NYJ:'NY Jets',
      LV:'Las Vegas Raiders',
      PHI:'Philadelphia Eagles',
      PIT:'Pittsburgh Steelers',
      LAC:'Los Angeles Chargers',
      SF:'San Francisco 49ers',
      SEA:'Seattle Seahawks',
      LAR:'Los Angeles Rams',
      TB:'Tampa Bay Buccaneers',
      TEN:'Tennessee Titans',
      WAS:'Washington Football Team'
    }
    fullTeam = teamsObj[rawPlayer.Team]
    this.player = new Player(rawPlayer.PlayerID, rawPlayer.PhotoUrl, `${rawPlayer.FirstName} ${rawPlayer.LastName}`, rawPlayer.Team, rawPlayer.Position)
    this.playerSelected = true
  }

  changeType(type:string) {
    switch(type) {
      case 'regular': 
        this.type = 'FantasyPoints'
        break;
      case 'ppr':
        this.type = 'FantasyPointsPPR'
        break;
      case 'yahoo': 
        this.type = 'FantasyPointsYahoo'
        break;
      case 'draftkings':
        this.type = 'FantasyPointsDraftKings'
        break;
      case 'fanduel':
        this.type = 'FantasyPointsFanDuel'
        break;
    }
  } 
  

}
