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
  animal = [];
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private gameService = inject(GameService);

  levels: { value: string, label: string }[] = [
    { value: 'easy', label: 'Fácil' },
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Difícil' },
    { value: 'master', label: 'Mestre' },
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoading = false;
    }, 3000);

    this.userForm();
  }

  userForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      level: ['',],
    })
  }

  onStart() {

    if (!this.form.get('name').value) {
      this.gameService.showError('O nome deve ter no mínimo 3 caracteres');
    }

    if (!this.form.get('level').value) {
      this.gameService.showError('Selecione um Level');
    }

    if (this.form.valid) {
      localStorage.setItem('name', this.form.get('name').value);
      this.gameService.setForm(this.form.value);
      this.router.navigate(['/game-start']);
    }

  }
}

