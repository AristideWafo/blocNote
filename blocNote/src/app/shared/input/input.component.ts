import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { KeyPressService } from '../../../services/key-press.service';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @Input() type: string = 'p'; // Type de l'input
  isEditing!: boolean; // Gère l'état d'édition
  editableText: string = ''; // Texte à éditer
  language: string = 'typescript'; // Langage de programmation
  test: string = ''; // Texte à é
  parsedContent: any = '';
  keyPressSubscription!: Subscription ; 
  creation:boolean = true;

  constructor(private keyPressService:KeyPressService) {   }
  ngOnInit(): void {
    this.enableEditing();
  }

  // Active le mode édition
  enableEditing() {
    
    // this.keyPressService.closeInput(0);
    this.isEditing = true;
    this.keyPressSubscription = this.keyPressService.behaviorSubject$.subscribe((value) => {
      if(this.creation){
        this.creation = false;
        console.log('false ' + this.editableText)
      }
      else{
        this.disableEditing();
        this.creation = true;
        console.log('true ' + this.editableText)
    }
    });
  }



  // Désactive le mode édition et enregistre les modifications
  disableEditing() {
    this.isEditing = false;
    this.keyPressSubscription.unsubscribe();
  }

  // Méthode appelée lors de la perte du focus (blur)
  saveChanges($event: any) {
    this.editableText = $event.target.value ;
    this.test = this.formatToMd().replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"");
    this.disableEditing();
  }
  
  formatToMd(){
    if(this.type == 'p'){
      return this.editableText;
    } else if(this.type == 'H1'){
      return `# ${this.editableText}`;
    } else if(this.type == 'H2'){
      return `## ${this.editableText}`;
    } else if(this.type == 'H3'){
      return `### ${this.editableText}`;
    } else if(this.type == 'H4'){
      return `#### ${this.editableText}`;
    } else if(this.type == 'code'){
      this.detectLanguage()
      return `\`\`\` ${this.language} \n${this.editableText}`;
    } else if(this.type == 'math'){
      return `$$ ${this.editableText} $$`;
    } else if(this.type == 'mermaid'){
      return `\`\`\`mermaid\n${this.editableText}\`\`\``;
    } else if(this.type == 'ul'){
      // return `- ${this.editableText.replace(/\n/g, '\n- ')}`;
      // return `- ${this.editableText}`;
      return `${this.editableText.split('\n').map(line => '\n- ' + line).join('\n')}`;
    } else if(this.type == 'ol'){ 
      return `1. ${this.editableText}`;
    } else if(this.type == 'blockquote'){
      return `> ${this.editableText.replace(/\n/g, '\n> ')}`;
      // return `${this.editableText.split('\n').map(line => '> ' + line).join("\\")}`;
    }
    return this.editableText;
  }
  parse(){
    return marked.parse(this.formatToMd());
  }
  detectLanguage(){
    console.log(
      hljs.highlightAuto(this.editableText)
    )
    hljs.highlightAll()
  }
  ok(){
    console.log(this.editableText)
    this.isEditing = true;
  }
}
