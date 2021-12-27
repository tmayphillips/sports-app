import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { NflComponent } from './nfl/nfl.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: '', component: PlayerSearchComponent },
  { path: 'sport/:sport', component: NflComponent },
  { path: 'team/:teamID/:teamName', component: TeamComponent},
  { path: '', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
