import { Component, EventEmitter, Output } from '@angular/core';
import { mdButtons } from '../../model/optionsModel';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.scss'
})
export class ListMenuComponent {
  @Output() pressedChoice = new EventEmitter<any>();
  mdButtons: any[] = mdButtons;
  sendPress(choice:any){
    this.pressedChoice.emit(choice);
  }
}
