import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IsCorrent } from '../directive/is-correct';
import { GameRoutingModule } from './game-routing.module';
import { DialogComponent } from '../dialog/dialog.component';
import { GameStartComponent } from '../game-start/game-start.component';
import { GameService } from '../service/game.service';
import { GameWelcomeComponent } from '../game-welcome/game-welcome.component';

@NgModule({
  declarations: [
    GameStartComponent,
    GameWelcomeComponent,
    DialogComponent,
    IsCorrent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    GameRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [GameService],
})
export class GameModule { }
