import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game-welcome',
  templateUrl: './game-welcome.component.html',
  styleUrls: ['./game-welcome.component.scss']
})
export class GameWelcomeComponent implements OnInit {

  form: FormGroup;
  showLoading: boolean = true;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private gameService = inject(GameService);

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoading = false;
    }, 3000);

    this.userForm();
  }

  userForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  getFormControl() {
    return this.form.controls;
  }

  onStart() {
    if (this.form.valid) {
      localStorage.setItem('name', this.getFormControl()['name'].value);
      this.router.navigate(['/game-start']);
    } else {
      this.gameService.showError('O nome deve ter no mínimo 3 caracteres');
    }

  }
}

