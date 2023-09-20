import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './master-of-music/dialog/dialog.component';
import { IsCorrent } from './master-of-music/directive/is-correct';
import { GameWelcomeComponent } from './master-of-music/game-home/game-home.component';
import { GameStartComponent } from './master-of-music/game-start/game-start.component';

@NgModule({
  declarations: [
    AppComponent,
    GameStartComponent,
    GameWelcomeComponent,
    DialogComponent,
    IsCorrent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
