import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges  } from '@angular/core';
import { Question } from '../question';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnChanges {
  
  MARGIN = 20;
  CANVAS_WIDTH = 400;
  CANVAS_HEIGHT = 400;
  @Input() question : Question;

  ctx: CanvasRenderingContext2D;
  canvasEl: HTMLCanvasElement;
  @ViewChild("drawCanvas") canvas: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvasEl = this.canvas?.nativeElement;
    this.ctx = this.canvasEl?.getContext("2d");
    this.draw(this.question);
  }

  ngOnChanges(){
    console.log("change happened");
  }

  // Taking question as an input instead of using the member because since it is 
  // called directly from question component on the second and later calls, it gets 
  // here before the angular cycle sets this.question to the current question, so 
  // the question would be one instance late.
  draw(question: Question){
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.ctx.strokeStyle = "#000000"; // color of grid lines
    this.ctx.beginPath();

    let rectXSize : number = (this.CANVAS_WIDTH - 2 * this.MARGIN) / question.x;
    let rectYSize : number = (this.CANVAS_HEIGHT - 2 * this.MARGIN) / question.y;
    for (let i = 0; i < question.x; i++){
      for (let j = 0; j < question.y; j++){
        var rectangle = new Path2D();
        rectangle.rect(
          i * rectXSize + this.MARGIN, 
          j * rectYSize + this.MARGIN, 
          rectXSize,
          rectYSize);
        this.ctx.stroke(rectangle);
      }
    }
  }
}
