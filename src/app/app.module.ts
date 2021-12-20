import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NflComponent } from './nfl/nfl.component';
import { NbaComponent } from './nba/nba.component';
import { MlbComponent } from './mlb/mlb.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { NewsHeadlinesComponent } from './news-headlines/news-headlines.component';
import { FantasyPlotComponent } from './fantasy-plot/fantasy-plot.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NflComponent,
    NbaComponent,
    MlbComponent,
    ScheduleComponent,
    StandingsComponent,
    TeamComponent,
    PlayerComponent,
    NavbarComponent,
    SecondaryNavbarComponent,
    PlayerSearchComponent,
    NewsHeadlinesComponent,
    FantasyPlotComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
