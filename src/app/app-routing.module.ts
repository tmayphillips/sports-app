import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { NflComponent } from './nfl/nfl.component';

const routes: Routes = [
  { path: '', component: PlayerSearchComponent },
  { path: 'nfl', component: NflComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
