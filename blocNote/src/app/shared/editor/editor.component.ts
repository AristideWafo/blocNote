import { AfterContentChecked, Component,} from '@angular/core';
import { KeyPressService } from '../../../services/key-press.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterContentChecked {
  constructor(private keyPressService:KeyPressService) { }
  ngAfterContentChecked(): void {
  //   this.keyPressService.closeInput(0);
  }
  enterPress:boolean = false;
  displayPossibiilty:boolean = false;
  inputs: any[] = [];
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
  addInput(type: string){
      this.inputs.push({type: type, value: type});
      this.displayPossibiilty = false;
      
      this.keyPressService.closeInput(0);
  }
  // diffuse(){
  //   this.enterPress = true;
  //   console.log(this.enterPress=!this.enterPress)
  // }
}
