import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  time : Date;
  targetSeconds: number;
  timer;

  timeClock$ = new Subject();
  timePassed : number;
  ALLOWED_SECONDS = 10;

  constructor() { }

  ngOnInit(): void {
    this.resetClock();
    this.updateTime();
    setInterval(() => this.timeClock$.next("Tic"), 1000);
    this.timeClock$.subscribe(((s : string) => s === "Tic" ? this.onTic() : null).bind(this));
    this.timeClock$.subscribe(((s : string) => s === "Time's up!" ? this.resetClock () : null).bind(this));

    this.timeClock$.subscribe(s => console.log(s));
  }

  resetClock(){
    this.timePassed = 0;
    this.updateTime();
  }

  onTic(){
    this.timePassed++;
    this.updateTime();
  }

  updateTime(){
    this.time = new Date((this.ALLOWED_SECONDS - this.timePassed) * 1000);
    if (this.timePassed > this.ALLOWED_SECONDS){
      this.timeClock$.next("Time's up!");
    }
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

}
