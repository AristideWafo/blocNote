import { AfterContentChecked, Component, input,} from '@angular/core';
import { KeyPressService } from '../../../services/key-press.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements AfterContentChecked {
  inputToModify: number = -1;
  constructor(private keyPressService:KeyPressService) { }
  ngAfterContentChecked(): void {
  //   this.keyPressService.closeInput(0);
  }
  enterPress:boolean = false;
  displayPossibiilty:boolean = false;
  inputs: any[] = [];
  // mdButtons: any[] = mdButtons
  addInput(type: string){
      this.inputs.push({type: type, value: type});
      this.displayPossibiilty = false;
      
      this.keyPressService.closeInput(0);
  }
  modifyOption(index:number){
    this.inputToModify != -1 ? this.inputToModify = -1 : this.inputToModify = index;
    this.displayPossibiilty = false;
  }
  onSelectOption(selected:any){
    console.log(selected);
    this.addInput(selected.type);
  }
  onModifyOption(selected:any){
    this.inputs[this.inputToModify] = {type: selected.type, value:  selected.type};
    this.inputToModify = -1;
  }
}
