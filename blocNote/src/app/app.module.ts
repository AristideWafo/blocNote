import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import mermaid from 'mermaid';
import { EditorComponent } from './shared/editor/editor.component';
import { InputComponent } from './shared/input/input.component';
import { marked } from 'marked';
import { ListMenuComponent } from './shared/list-menu/list-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    InputComponent,
    ListMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    // MarkdownModule.forRoot({
    //   loader: HttpClientModule, // if using HTTP to load markdown files
    //   sanitize: SecurityContext.NONE // to allow HTML in markdown
    // }),
    // MarkdownModule.forChild(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(){
    mermaid.initialize({ startOnLoad: true });
  }

 }
