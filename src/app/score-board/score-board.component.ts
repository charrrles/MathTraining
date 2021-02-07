import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  successes:number;
  target:number = 20;
  constructor() { }

  ngOnInit(): void {
    this.successes = 0;
  }

}
