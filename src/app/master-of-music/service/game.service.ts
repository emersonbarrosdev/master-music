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
    const API = "../../../assets/song.json"
    return this.httpClient.get<any>(API);
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
