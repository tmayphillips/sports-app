import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import * as PlotlyJS from 'plotly.js-dist-min';
// import { PlotlyModule } from 'angular-plotly.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NflComponent } from './nfl/nfl.component';
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
import { PlotComponent } from './plot/plot.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NflComponent,
    ScheduleComponent,
    StandingsComponent,
    TeamComponent,
    PlayerComponent,
    NavbarComponent,
    SecondaryNavbarComponent,
    PlayerSearchComponent,
    NewsHeadlinesComponent,
    FantasyPlotComponent,
    SearchFilterPipe,
    PlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // PlotlyModule, 
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
