import { Component, HostListener, ViewChild} from '@angular/core';
import {WorkspaceComponent} from './workspace/workspace.component';
import {ToolSelectorService} from './tool-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Redsim';
  constructor(private toolSelector: ToolSelectorService){}

  @ViewChild(WorkspaceComponent)
  private workspaceComponent: WorkspaceComponent;

  //this listens for keypresses and selects tools based on which key is pressed
  @HostListener('document:keypress',['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    switch(event.key){
      case 'r':
        this.toolSelector.setTool('red');
        break;
    }
  }

  private increaseGridHeight(){
    this.workspaceComponent.gridCellHeight++;
    this.workspaceComponent.updateCanvasSize();
  }

  private decreaseGridHeight(){
    if(this.workspaceComponent.gridCellHeight > 1){
      this.workspaceComponent.gridCellHeight--;
      this.workspaceComponent.updateCanvasSize();
    }
  }

  private increaseGridWidth(){
    this.workspaceComponent.gridCellWidth++;
    this.workspaceComponent.updateCanvasSize();
  }

  private decreaseGridWidth(){
    if(this.workspaceComponent.gridCellWidth > 1){
      this.workspaceComponent.gridCellWidth--;
      this.workspaceComponent.updateCanvasSize();
    }
  }

  private zoomGridOut(){
    if(this.workspaceComponent.cellPixelHeight > 5){
      this.workspaceComponent.cellPixelHeight-=5;
      this.workspaceComponent.cellPixelWidth-=5;
      this.workspaceComponent.updateCanvasSize();
    }
  }

  private zoomGridIn(){
    this.workspaceComponent.cellPixelHeight+=5;
    this.workspaceComponent.cellPixelWidth+=5;
    this.workspaceComponent.updateCanvasSize();
  }
}
