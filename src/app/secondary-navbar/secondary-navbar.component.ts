import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Player } from '../players';

@Component({
  selector: 'secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss']
})
export class SecondaryNavbarComponent implements OnInit {
  sport:string | null = ''
  player:Player = new Player(0,'','','','')
  public scheduleRoute:string = ''
  public standingsRoute:string = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport')
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        this.sport = this.route.snapshot.paramMap.get('sport')
        this.scheduleRoute = '/sport/${this.sport}/schedule'
        this.standingsRoute = '/sport/${this.sport}.standings'
      }
    )
  }

}
