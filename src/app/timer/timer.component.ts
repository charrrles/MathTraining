import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../scoreboard.service';
import { TimingService } from '../timing.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeDisplay : Date;

  constructor(
    private timingService : TimingService, 
    private scoreboardService: ScoreboardService) { }

  ngOnInit(): void {
    this.resetClock();
    this.updateTime(0);
    this.timingService.getSeconds$().subscribe(((s : number) => this.updateTime(s)).bind(this));
    this.timingService.onTimesUp$().subscribe((() => this.resetClock() ).bind(this));
  }

  resetClock(){
    this.timeDisplay = new Date(this.timingService.ALLOWED_SECONDS * 1000);
  }

  updateTime(secondsPassed : number){
    this.timeDisplay = new Date((this.timingService.ALLOWED_SECONDS - secondsPassed) * 1000);
  }
}
