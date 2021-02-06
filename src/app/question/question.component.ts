import { Component, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CanvasComponent } from '../canvas/canvas.component';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentQuestion: Question;
  goodAnswer: boolean = false;
  questionForm: FormGroup;
  MAX_NB = 12;

  @ViewChild("drawCanvas") canvas: CanvasComponent;

  constructor() { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'answerField': new FormControl('',
        [Validators.required], 
        [this.validateAnswerAsync.bind(this)]
      )
    });
    this.getNextQuestion();
  }

  getCurrentQuestion(): string {
    return `${this.currentQuestion.x} x ${this.currentQuestion.y}`;
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  getNextQuestion() {
    let freeRand = this.getRandomInt(12);
    let fixedRand = this.getRandomInt(this.MAX_NB);

    // Make 0 and 1 rare.
    if (freeRand === 0 || freeRand === 1 || fixedRand === 0 || fixedRand === 1){
      freeRand = this.getRandomInt(12);
      fixedRand = this.getRandomInt(this.MAX_NB);
    }

    let question: Question;
    if (this.getRandomInt(1) === 0) {
      question = { x: fixedRand, y: freeRand };
    } else {
      question = { x: freeRand, y: fixedRand };
    }
    this.currentQuestion = question;
    this.canvas.draw(question);
    return question;
  }

  validateAnswerAsync(control: AbstractControl): Observable<ValidationErrors | null> {
    return of( this.validateAnswer(control));
  }

  validateAnswer(cont: AbstractControl): ValidatorFn {
    this.submitAnswer();
    return (control: AbstractControl): {[key: string]: any} | null => {    
      return this.goodAnswer ? null : {validateAnswer: {valid: false }};
    }
  }  

  async onGoodAnswer() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.questionForm.reset();
        this.getNextQuestion();
        this.goodAnswer = false;
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
