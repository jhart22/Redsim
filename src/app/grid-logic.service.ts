/**this will contain all the logic for interaction between grid components */
import { Injectable } from '@angular/core';

@Injectable()
export class GridLogicService {

  private grid: string[][];

  //these values are currently defined; they will at some point be dynamic
  private width: number = 40;
  private height: number = 22;

  constructor() { 
    console.log("Grid logic service constructed");
    this.initGrid();
  }

  //this function initializes all of the grid's logical values to empty
  private initGrid(){
    this.grid = [];
    for(let i: number  = 0; i < this.width; i++){
      this.grid[i] = [];
      for(let j: number = 0; j < this.height; j++){
        this.grid[i][j] = 'white';
      }
    }
  }

  //this function takes input from the workspace to update the grid
  public updateGrid(x: number, y:number, value: string){
    this.grid[x][y] = value;
    console.log(x + "," + y + " updated to " + this.grid[x][y]);

    //for testing purposes, blue should turn neighboring red blocks to blue. I want to make all of the changes appear after the click happens
    if(value == "blue"){
      if(x > 0 && this.getValue(x-1,y) == "red")
        this.updateGrid(x-1,y, "blue");
      if(x< this.width - 1 && this.getValue(x+1,y) == "red")
        this.updateGrid(x+1,y,"blue");
      if(y > 0 && this.getValue(x,y-1) == "red")
        this.updateGrid(x,y-1,"blue");
      if(y < this.height - 1 && this.getValue(x,y+1) == "red")
        this.updateGrid(x,y+1,"blue");
    }
  }

  //returns value of selected grid coordinate
  public getValue(x: number, y: number){
    return this.grid[x][y];
  }
}
