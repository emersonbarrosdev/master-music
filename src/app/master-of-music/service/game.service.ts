import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IForm } from '../models/form';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  valueForm: IForm;
  private httpClient = inject(HttpClient);
  private dialog = inject(MatDialog);

  getAllSongs() {
    return this.httpClient.get<any>(this.getApiSongs());
  }

  getApiSongs(): string {
    let API = '';
    this.valueForm = this.getForm();
    switch (this.valueForm.level) {
      case 'easy':
        API = '../../../assets/api/easy.json';
        break;
      case 'normal':
        API = '../../../assets/api/normal.json';
        break;
      case 'hard':
        API = '../../../assets/api/hard.json';
        break;
      case 'master':
        API = '../../../assets/api/master.json';
        break;
    }
    return API;
  }

  getForm(): IForm {
    return this.valueForm;
  }

  setForm(value: IForm) {
    this.valueForm = value;
  }

  showError(msgError: string) {
    this.dialog.open(DialogComponent, {
      data: msgError
    });
  }
}
