import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';


class Question {
  x: number;
  y: number
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentQuestion: Question;
  goodAnswer: boolean = false;
  questionForm: FormGroup;
  MAX_NB = 5;

  constructor() { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'answerField': new FormControl('',
        [Validators.required], 
        [this.validateAnswerAsync.bind(this)]
      )
    });
    this.currentQuestion = this.getNextQuestion();
  }
  getCurrentQuestion(): string {
    return `${this.currentQuestion.x} x ${this.currentQuestion.y}`;
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  validateAnswerAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    // turn into an observable
    return of( this.validateAnswer(control));
  }

  validateAnswer(cont: AbstractControl): ValidatorFn {
    this.submitAnswer();
    return (control: AbstractControl): {[key: string]: any} | null => {    
      return this.goodAnswer ? null : {validateAnswer: {valid: false }};
    }
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  getNextQuestion(): Question {
    let freeRand = this.getRandomInt(12);
    let fixedRand = this.getRandomInt(this.MAX_NB);
    let question: Question;
    if (this.getRandomInt(1) === 0) {
      question = { x: fixedRand, y: freeRand };
    } else {
      question = { x: freeRand, y: fixedRand };
    }
    return question;
  }

  async onGoodAnswer() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.questionForm.reset();
        this.currentQuestion = this.getNextQuestion();
      }, 800);
    });
  }

  async submitAnswer() {
    if (!this.questionForm || !this.currentQuestion || !this.questionForm.get('answerField').value) {
      return;
    }
    this.goodAnswer = +this.questionForm.get('answerField').value === this.currentQuestion.x * this.currentQuestion.y;
    console.log("Answer:" + this.goodAnswer);
    if (this.goodAnswer) {
      await this.onGoodAnswer();
    }
  }
}
