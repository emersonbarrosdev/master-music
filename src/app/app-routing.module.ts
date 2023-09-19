import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameStartComponent } from './master-of-music/game-start/game-start.component';
import { GameWelcomeComponent } from './master-of-music/game-home/game-home.component';

const routes: Routes = [
  {
    path: '',
    component: GameWelcomeComponent
  },
  {
    path: 'game-start',
    component: GameStartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
