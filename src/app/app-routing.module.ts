import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { NflComponent } from './nfl/nfl.component';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sport/:sport', component: NflComponent },
  { path: 'sport/:sport/team/:teamID/:teamName', component: TeamComponent},
  { path: 'sport/:sport/schedule', component: ScheduleComponent},
  { path: 'sport/:sport/standings', component: StandingsComponent},
  { path: '', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
