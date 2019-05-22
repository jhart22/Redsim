import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ToolSelectorService } from '../tool-selector.service';
import { GridLogicService } from '../grid-logic.service';

@Component({
  selector: 'app-workspace',
  template: '<canvas #canvas (click)="onClick($event)" (dblclick)="onDoubleClick($event)"></canvas>',
  providers: [GridLogicService]
})
export class WorkspaceComponent implements AfterViewInit {

  @Input() increaseSizeButton;
  @ViewChild('canvas') public canvas: ElementRef;

  private gridCellWidth = 40;
  private gridCellHeight = 22;

  private cellPixelWidth = 30;
  private cellPixelHeight = 30;

  private gridPixelWidth = (this.gridCellWidth * this.cellPixelWidth) + 1;
  private gridPixelHeight = (this.gridCellHeight * this.cellPixelHeight) + 1;



  private context: CanvasRenderingContext2D;

  constructor(private toolSelector: ToolSelectorService, private gridLogic: GridLogicService) { }

  //Once the view initializes, create the workspace grid
  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    canvasEl.width = this.gridPixelWidth;
    canvasEl.height = this.gridPixelHeight;

    this.drawGrid();
  }

  //this method creates the grid
  private drawGrid() {

    //pixel size of grid
    var width = this.gridPixelWidth - 1;
    var height = this.gridPixelHeight - 1;

    //set the context for drawing
    var context = this.context;

    //create the vertical lines for grid
    for (var x = 0; x <= width; x += this.cellPixelWidth) {
      context.moveTo(0.5 + x, 0);
      context.lineTo(0.5 + x, height);
    }

    // create the horizontal lines for grid
    for (var y = 0; y <= height; y += this.cellPixelHeight) {
      context.moveTo(0, 0.5 + y);
      context.lineTo(width, 0.5 + y);
    }

    //fills in the corner pixel
    context.moveTo(this.gridPixelWidth-1,this.gridPixelHeight-1);
    context.lineTo(this.gridPixelWidth,this.gridPixelHeight);

    //draw lines
    context.strokeStyle = "black";
    context.stroke();
  }

  //this is called by mouseclicks on the grid canvas, and calculates which block needs to be updated
  private onClick(event){

    var rect = event.target.getBoundingClientRect();
    //this gross formula converts mouse coordinates to grid location
    let x = (-1* Math.ceil((rect.left - event.pageX)/this.cellPixelWidth));
    let y = (-1 * Math.ceil((rect.top - event.pageY)/this.cellPixelHeight));

    //this passes the changes to the logic handler
    this.gridLogic.updateGrid(x,y,this.toolSelector.getTool())
    //this.updateCellGraphics(x,y);
    this.updateGridGraphics();
  }


  private onDoubleClick(event){

    var rect = event.target.getBoundingClientRect();
    //this gross formula converts mouse coordinates to grid location
    let x = (-1* Math.ceil((rect.left - event.pageX)/this.cellPixelWidth));
    let y = (-1 * Math.ceil((rect.top - event.pageY)/this.cellPixelHeight));

    console.log(x + "," + y);

    this.gridLogic.updateGrid(x,y,"empty");
    this.updateCellGraphics(x,y);
  }

  //draw over the grid square according to selected tool
  private updateCellGraphics(x: number,y: number){
    let xcoord = (this.cellPixelWidth * (x));
    let ycoord = (this.cellPixelHeight * (y));

    let context = this.context;

    context.beginPath();
    context.rect(xcoord+1,ycoord+1,this.cellPixelWidth-1,this.cellPixelHeight-1);

    context.fillStyle = this.parseType(this.gridLogic.getValue(x,y));

    context.fill();
  }

  private updateGridGraphics(){
    for(let x = 0; x < this.gridCellWidth; x++){
      for(let y = 0; y < this.gridCellHeight; y++){
        this.updateCellGraphics(x,y);
      }
    }
  }

  private parseType(s: string){
    if(s == "empty")
      return "white";
    return s;
  }

  public decreaseGridSize(){
    this.gridCellHeight--;
    this.gridCellWidth--;

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    
    this.gridPixelWidth = (this.gridCellWidth * this.cellPixelWidth) + 1;
    this.gridPixelHeight = (this.gridCellHeight * this.cellPixelHeight) + 1;

    canvasEl.width = this.gridPixelWidth;
    canvasEl.height = this.gridPixelHeight;
    this.drawGrid();
    this.updateGridGraphics();
  }

  public increaseGridSize(){
    this.gridCellHeight++;
    this.gridCellWidth++;

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.context = canvasEl.getContext('2d');

    
    this.gridPixelWidth = (this.gridCellWidth * this.cellPixelWidth) + 1;
    this.gridPixelHeight = (this.gridCellHeight * this.cellPixelHeight) + 1;

    canvasEl.width = this.gridPixelWidth;
    canvasEl.height = this.gridPixelHeight;
    this.drawGrid();
    this.updateGridGraphics();
  }
}
