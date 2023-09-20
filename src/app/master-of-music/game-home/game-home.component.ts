import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    { value: 'easy', label: 'Fácil' },
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Difícil' },
    { value: 'master', label: 'Mestre' },
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
      level: ['normal'],
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
      const playerName = this.form.get('name').value;
      const playerLevel = this.form.get('level').value;
      const existingPlayers = JSON.parse(localStorage.getItem('players') || '[]');
      const playerExists = existingPlayers.find(player => player.name === playerName);

      if (playerExists) {
        localStorage.setItem('players', JSON.stringify(existingPlayers));
      } else {
        existingPlayers.push({ name: playerName, level: playerLevel });
        localStorage.setItem('players', JSON.stringify(existingPlayers));
      }
      localStorage.setItem(`${playerName}_points`, '0');
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('playerLevel', playerLevel);
      this.gameService.setForm(this.form.value);
      this.router.navigate(['/game-start']);
    }
  }
}
