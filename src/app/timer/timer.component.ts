import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeClock = new Subject();
  time : Date;
  targetTime: Date;
  timer;
  ALLOWED_TIME = 2;

  constructor() { }

  ngOnInit(): void {
    this.resetClock();
    this.timer = setInterval(this.updateTime.bind(this), 1000);
  }

  resetClock(){
    this.time = new Date(0);
    this.time.setMinutes(2);
    this.targetTime = new Date((new Date()).getTime() + this.ALLOWED_TIME * 60000);
  }

  updateTime(){
    let currentTime = new Date();
    this.time = new Date(this.targetTime.getTime() - currentTime.getTime());
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

}
