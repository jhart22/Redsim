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

  private increaseGridSize(){
    this.workspaceComponent.increaseGridSize();
  }

  private decreaseGridSize(){
    this.workspaceComponent.decreaseGridSize();
  }
}
