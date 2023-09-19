import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { GameService } from '../service/game.service';
import { IForm } from '../models/form';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
})
export class GameStartComponent implements OnInit {

  playerName: string;
  questionList: any = [];
  currentQuestion: number = 0;
  isQuizCompleted: boolean = false;
  points: number = 0;
  counter: number = 45;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval: any;
  isSelected: boolean = true;
  valueForm: IForm;
  topPlayers: { name: string, points: number }[] = [];
  @ViewChild('audioElement') audioElement: ElementRef;
  isAudioPlaying: boolean;

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.valueForm = this.gameService.getForm();
    this.getAllQuestions();
    this.startCounter();
    this.updateTopPlayers();
  }

  toggleAudio() {
    const audio: HTMLAudioElement = this.audioElement.nativeElement;

    if (audio.paused) {
      audio.play();
      this.isAudioPlaying = true;
      this.startCounter();
    } else {
      audio.pause();
      this.isAudioPlaying = false;
      this.stopCounter();
    }
  }

  shuffleQuestions() {
    for (let i = this.questionList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questionList[i], this.questionList[j]] = [this.questionList[j], this.questionList[i]];
    }
  }

  getAllQuestions() {
    this.gameService.getAllSongs().subscribe(
      resp => {
        this.isAudioPlaying = true;
        this.questionList = resp.questions;
        this.shuffleQuestions();
      });
  }

  questionAnswer(currentQuantity: number, option: any) {
    this.isSelected = false;
    if (currentQuantity === this.questionList.length) {
      this.interval = interval(1000)
        .subscribe(val => {
          this.isQuizCompleted = true;
          this.stopCounter();
        });
      setTimeout(() => {
        this.interval.unsubscribe();
      }, 100000);
    }
    if (option.correct) {
      this.points += 3;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
      }, 1000);
      this.points -= 0;
    }
    const playerName = localStorage.getItem('playerName');
    localStorage.setItem(`${playerName}_points`, this.points.toString());
    this.updateTopPlayers();
  }


  updateTopPlayers() {
    const players: { name: string, points: number }[] = [];
    const existingPlayers = JSON.parse(localStorage.getItem('players') || '[]');
    existingPlayers.forEach(player => {
      const playerName = player.name;
      const playerPoints = parseInt(localStorage.getItem(`${playerName}_points`) || '0', 10);
      players.push({ name: playerName, points: playerPoints });
    });
    players.sort((a, b) => b.points - a.points);

    this.topPlayers = players.slice(0, 5);
  }

  formatCounterValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  startCounter() {
    this.interval = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 45;
          this.points -= 0;
        }
        this.questionTimeout();
      });
    setTimeout(() => {
      this.interval.unsubscribe();
    }, 300000);
  }

  stopCounter() {
    this.interval.unsubscribe();
    this.counter;
  }

  questionTimeout() {
    if (this.currentQuestion >= this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter()
    }
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 45;
    this.startCounter();
  }

  home() {
    this.router.navigate(['']);
  }
}
