import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { GameService } from '../service/game.service';

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
  counter: number = 30;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval: any;
  isSelected: boolean = true;

  private router = inject(Router);
  private gameService = inject(GameService);

  ngOnInit(): void {
    this.playerName = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.gameService.getAllSongs().subscribe(
      resp => {
        this.questionList = resp.questions;
      })
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
      this.points += 1;
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
          this.counter = 30;
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
    this.counter = 30;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 30;
    this.currentQuestion = 0;
  }


  init() {
    this.router.navigate(['']);
  }

}
