import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PlayerService } from '../player.service';
import { Player } from '../players';

@Component({
  selector: 'player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})
export class PlayerSearchComponent implements OnInit {

  constructor(
    private playerService:PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  player:Player = new Player(0,'','','','')
  players: Array<any> = []
  query:string = ''
  playerID:number = 0
  selectedPlayer:string = ''
  playerSelected:boolean = false;
  sport:string | null = ''

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.sport = this.route.snapshot.paramMap.get('sport')
      }
    )
    this.getPlayerArray()
  }

  getPlayerArray() {
    this.playerService
      .getPlayers(this.sport)
      .then((resp:any) => {
        this.players=resp;
        console.log(this.players)
      })
  }

  selectPlayer(player:any) {
    console.log(player.PlayerID)
  }

  onSelectPlayer(rawPlayer:any) {
    console.log(rawPlayer)
    this.query = ''
    let fullTeam:string = ''
    // let abbTeam:string = rawPlayer.Team  
    // let teamsObj:any = {
    //   ARI:'Arizona Cardinals', 
    //   ATL:'Atlanta Falcons', 
    //   BAL:'Baltimore Ravens', 
    //   BUF:'Buffalo Bills', 
    //   CAR:'Carolina Panthers', 
    //   CHI:'Chicago Bears', 
    //   CIN:'Cincinnati Bengals', 
    //   CLE:'Cleveland Browns',
    //   DAL:'Dallas Cowboys',
    //   DEN:'Denver Broncos',
    //   DET:'Detroit Lions',
    //   GB:'Green Bay Packers',
    //   HOU:'Houston Texans',
    //   IND:'Indianapolis Colts',
    //   JAX:'Jacksonville Jaguars',
    //   KC:'Kansas City Chiefs',
    //   MIA:'Miami Dolphins',
    //   MIN:'Minnesota Vikings',
    //   NE:'New England Patriots',
    //   NO:'New Orleans Saints',
    //   NYG:'NY Giants',
    //   NYJ:'NY Jets',
    //   LV:'Las Vegas Raiders',
    //   PHI:'Philadelphia Eagles',
    //   PIT:'Pittsburgh Steelers',
    //   LAC:'Los Angeles Chargers',
    //   SF:'San Francisco 49ers',
    //   SEA:'Seattle Seahawks',
    //   LAR:'Los Angeles Rams',
    //   TB:'Tampa Bay Buccaneers',
    //   TEN:'Tennessee Titans',
    //   WAS:'Washington Football Team'
    // }
    // fullTeam = teamsObj[rawPlayer.Team]
    this.player = new Player(rawPlayer.PlayerID, rawPlayer.PhotoUrl, `${rawPlayer.FirstName} ${rawPlayer.LastName}`, rawPlayer.Team, rawPlayer.Position)
    this.playerSelected = true
  }

}
