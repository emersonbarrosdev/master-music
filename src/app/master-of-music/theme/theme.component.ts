import { Component } from '@angular/core';
import { ETheme } from '../models/enum/etheme';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {

  applyIcon: ETheme = ETheme.ICON_MOON;

  toggle() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      this.applyIcon = ETheme.ICON_SUN;
    } else {
      this.applyIcon = ETheme.ICON_MOON;
    }
  }

}
