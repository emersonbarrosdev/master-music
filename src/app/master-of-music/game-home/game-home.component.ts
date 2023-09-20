import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameWelcomeComponent implements OnInit {

  form: FormGroup;
  showLoading: boolean = true;
  private router: Router;
  private formBuilder: FormBuilder;
  private gameService: GameService;

  levels: { value: string, label: string }[] = [
    { value: 'easy', label: 'Fácil - 10 Músicas' },
    { value: 'normal', label: 'Normal - 20 Músicas' },
    { value: 'hard', label: 'Difícil - 35 Músicas' },
    { value: 'master', label: 'Mestre - 85 Músicas' },
  ];

  constructor(
    formBuilder: FormBuilder,
    gameService: GameService,
    router: Router
  ) {
    this.formBuilder = formBuilder;
    this.gameService = gameService;
    this.router = router;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoading = false;
    }, 3000);

    this.userForm();
  }

  userForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      level: [''],
    });
  }

  onStart() {
    const nameControl = this.form.get('name');
    const levelControl = this.form.get('level');

    if (!nameControl.value || nameControl.value.length < 3) {
      this.gameService.showError('O Nome deve ter no mínimo 3 caracteres.');
      return;
    }

    if (!levelControl.value) {
      this.gameService.showError('Selecione um Level para continuar.');
      return;
    }

    if (this.form.valid) {
      const playerName = nameControl.value;
      const playerLevel = levelControl.value;
      localStorage.setItem(`${playerName}_points`, '0');
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('playerLevel', playerLevel);
      this.gameService.setForm(this.form.value);
      this.router.navigate(['/game-start']);
    }
  }
}
