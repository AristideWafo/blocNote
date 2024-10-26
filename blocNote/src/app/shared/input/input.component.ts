import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { KeyPressService } from '../../../services/key-press.service';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @ViewChild('textarea') textarea!: ElementRef; // Référence au textarea
  @Input() type: string = 'p'; // Type de l'input
  isEditing: boolean = true; // Gère l'état d'édition
  editableText: string = ''; // Texte à éditer
  language: string = 'typescript'; // Langage de programmation
  test: string = ''; // Texte à é
  parsedContent: any = '';
  keyPressSubscription!: Subscription ; 
  creation:boolean = false;
  alreadySave:boolean = false;
  selectedText: string = '';

  // constructor(private sanitizer: DomSanitizer) {}
  constructor(private keyPressService:KeyPressService, private sanitizer: DomSanitizer) {   }
  ngOnInit(): void {
    this.enableEditing();
  }
  // Active le mode édition
  enableEditing() {
    
    // this.keyPressService.closeInput(0);
    this.isEditing = true;
    setTimeout(() => {
      this.textarea.nativeElement.focus(); // Met le focus sur le textarea après un léger délai
    });
    this.keyPressSubscription = this.keyPressService.behaviorSubject$.subscribe((value) => {
      if(!this.creation){
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
  closeInsertEnter($event: any) {
    this.saveAndTreatement($event);
    console.log(this.editableText)
    this.disableEditing();
    // this.test = this.formatToMd().replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"");
    this.alreadySave = true;
  }
  
  //Formater mon code to Markdown
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
      return `${this.editableText.split('\n').map(line => '\n- ' + line).join('\n')}`;
    } else if(this.type == 'ol'){ 
      return `1. ${this.editableText}`;
    } else if(this.type == 'blockquote'){
      return `> ${this.editableText.replace(/\n/g, '\n> ')}`;
    }
    return this.editableText;
  }
  parse(){
    return marked.parse(this.formatToMd());
    // return this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.formatToMd()).toString());
  }
  detectLanguage(){
    // console.log(
    //   hljs.highlightAuto(this.editableText)
    // )
    // hljs.highlightAll()
    console.log('detect')
  }
  ok(){
    console.log(this.editableText)
    this.isEditing = true;
  }
  closeInsertBlur($event:any){
    // console.log('close')
  if(!this.alreadySave){
      this.saveAndTreatement($event);
      this.isEditing = false;
      console.log(2)
    }
      this.alreadySave = false;
  }
  saveAndTreatement($event:any){
    // this.editableText = $event.target.value ;
    // this.test = this.formatToMd().replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"");
    this.alreadySave = true;
  }

  getSelectedText(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    if (start !== null && end !== null && start !== end) {
      this.selectedText = this.editableText.substring(start, end);
      alert(this.selectedText)
    } else {
      this.selectedText = ''; // Rien n'est sélectionné
    }
  }
}
