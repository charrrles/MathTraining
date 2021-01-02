import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


class Question {
  x:number; 
  y:number
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  currentQuestion: Question;
  goodAnswer:boolean = false;
  questionForm: FormGroup;  
  MAX_NB = 5;

  constructor() { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'answerField' : new FormControl('', [
        Validators.required,
        this.validateAnswer.bind(this)
      ])
    });
    this.currentQuestion = this.getNextQuestion();
  }
  getCurrentQuestion() : string {
    return `${this.currentQuestion.x} x ${this.currentQuestion.y}`;
  }

  validateAnswer(cont: FormControl) {
    this.submitAnswer();
    return this.goodAnswer ? null : {
      validateAnswer: {
        valid: false
      }
    };
  }

  getRandomInt(max:number) : number {
    return Math.floor(Math.random() * (max + 1)); 
  }

  getNextQuestion(): Question {
    let freeRand = this.getRandomInt(12);
    let fixedRand = this.getRandomInt(this.MAX_NB);
    let question : Question;
    if (this.getRandomInt(1) === 0){
      question = { x : fixedRand, y : freeRand};
    } else {
      question = { x : freeRand, y : fixedRand};
    }
    return question;
  }

  submitAnswer() {
    if (!this.questionForm || !this.currentQuestion  || !this.questionForm.get('answerField').value){
      return;
    }
    this.goodAnswer = +this.questionForm.get('answerField').value === this.currentQuestion.x * this.currentQuestion.y;
    if (this.goodAnswer){
      this.currentQuestion = this.getNextQuestion();
      setTimeout(() => {
        this.questionForm.reset(); //.get('answerField').errors..clearValidators();
      },1000)
//      this.questionForm.get('answerField').reset();
    }
    console.log("Answer:" + this.goodAnswer);
  }
}
