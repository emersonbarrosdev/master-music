import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameWelcomeComponent } from '../game-welcome/game-welcome.component';
import { GameStartComponent } from '../game-start/game-start.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
