import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../scoreboard.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  constructor(private scoreboardService: ScoreboardService) { }

  ngOnInit(): void {

  }

  getSuccesses(){
    return this.scoreboardService.getGoodAnswers();
  }

  getTarget(){
    return this.scoreboardService.getTarget();
  }

  isGameFinished(){
    return this.scoreboardService.finishedGame;
  }
}
