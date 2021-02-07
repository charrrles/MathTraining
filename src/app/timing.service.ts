import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimingService implements OnDestroy {
  private timer;
  private timeClock$ = new Subject();
  private timeIsUp$ = new Subject();
  timePassed : number;
  ALLOWED_SECONDS = 120;

  constructor() { 
    this.timePassed = 0;
  }

  public start(){
    if (!this.timer){
      this.timer = setInterval(() => this.onTic(), 1000);
    }
  }

  public stop(){
    clearInterval(this.timer);
    this.timePassed = 0;
    this.timeIsUp$.next();    
  }

  private onTic(){
    this.timePassed++;
    this.timeClock$.next(this.timePassed);

    if (this.timePassed > this.ALLOWED_SECONDS){
      this.stop();
    }
  }

  getSeconds$() : Observable<any>{
    return this.timeClock$.asObservable();
  }

  onTimesUp$() : Observable<any>{
    return this.timeIsUp$.asObservable();
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }
}
