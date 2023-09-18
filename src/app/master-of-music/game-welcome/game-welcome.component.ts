import { Component, OnInit, Inject } from '@angular/core';
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
      level: [''],
    });
  }

  onStart() {
    if (!this.form.get('name').value) {
      this.gameService.showError('O nome deve ter no mínimo 3 caracteres');
      return;
    }

    if (!this.form.get('level').value) {
      this.gameService.showError('Selecione um Level');
      return;
    }

    if (this.form.valid) {
      const playerName = this.form.get('name').value;
      const playerLevel = this.form.get('level').value;

      // Verificar se o jogador já existe no Local Storage
      const existingPlayers = JSON.parse(localStorage.getItem('players') || '[]');
      const playerExists = existingPlayers.find(player => player.name === playerName);

      if (playerExists) {
        // Exibir mensagem de confirmação
        // const confirmMessage = `Jogador ${playerName} já existe. Deseja substituir?`;
        // if (confirm(confirmMessage)) {
        //   // Substituir o jogador existente
        //   existingPlayers.forEach(player => {
        //     if (player.name === playerName) {
        //       player.level = playerLevel;
        //     }
        //   });
        //   localStorage.setItem('players', JSON.stringify(existingPlayers));
        // }
      } else {
        // Adicionar o jogador ao Local Storage
        existingPlayers.push({ name: playerName, level: playerLevel });
        localStorage.setItem('players', JSON.stringify(existingPlayers));
      }

      // Inicializar os pontos do jogador com 0
      localStorage.setItem(`${playerName}_points`, '0');

      localStorage.setItem('playerName', playerName);
      localStorage.setItem('playerLevel', playerLevel);
      this.gameService.setForm(this.form.value);
      this.router.navigate(['/game-start']);
    }
  }
}
