import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimingService } from './timing.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  private goodAnswers :number;
  private target:number = 20;
  private completedGame$ = new Subject();
  public finishedGame:boolean = false;

  constructor(private timingService:TimingService) { 
    this.goodAnswers = 0;
    this.completedGame$.subscribe(() => this.completedGame())
  }

  onGoodAnswer(){
    this.goodAnswers++;
    if (this.goodAnswers === this.target){

      this.completedGame$.next();
    }
  }

  reset(){
    this.goodAnswers = 0;
    this.finishedGame = false;
  }

  getGoodAnswers() {
    return this.goodAnswers;
  }

  getTarget(){
    return this.target;
  }

  completedGame() {
    this.timingService.stop();
    this.finishedGame = true;
  }

  onCompletedGame$() : Observable<any>{
    return this.completedGame$.asObservable();
  }
}
