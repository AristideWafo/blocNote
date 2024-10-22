import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.scss'
})
export class ListMenuComponent {
  @Output() pressedChoice = new EventEmitter<any>();
  mdButtons: any[] = [
    {type: 'p', value: 'Paragraphe'},
    {type: 'H1', value: 'Titre 1'},
    {type: 'H2', value: 'Titre 2'},
    {type: 'H3', value: 'Titre 3'},
    {type: 'H4', value: 'Titre 4'},
    {type: 'code', value: 'Code'},
    {type: 'math', value: 'Mathématiques'},
    {type: 'mermaid', value: 'DMermaid'},
    {type: 'ul', value: 'ul'},
    {type: 'ol', value: 'ol'},
    {type: 'blockquote', value: 'blockquote'},

  ];
//   addInput(type: string){
//     this.inputs.push({type: type, value: type});
//     this.displayPossibiilty = false;
//     this.keyPressService.closeInput(0);
// }
sendPress(choice:any){
  this.pressedChoice.emit(choice);
}
}
