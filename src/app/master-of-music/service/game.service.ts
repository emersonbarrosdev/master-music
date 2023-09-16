import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private httpClient = inject(HttpClient);
  private dialog = inject(MatDialog);

  getAllSongs() {
    const API = "../../../assets/song.json"
    return this.httpClient.get<any>(API);
  }

  // getQuestionsByLevel(level: string) {
  //   return this.httpClient.get(this.API) as any;
  // }


  showError(msgError: string) {
    this.dialog.open(DialogComponent, {
      data: msgError
    });
  }
}
