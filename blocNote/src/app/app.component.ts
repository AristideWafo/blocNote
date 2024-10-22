import { Component } from '@angular/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blocNote';
  markdownContent: string = `
  # Titre H1
  Voici un **exemple de texte** en Markdown provenant d'une variable.

  ## Liste
  - Élément 1
  - Élément 2

  ## Code
  \`\`\`typescript
  const message = 'Hello from a variable!';
  console.log(message);
  \`\`\`

  ## Mathématiques
  $$ E = mc^2 $$

  ## Diagramme Mermaid
  \`\`\`mermaid
  graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
  \`\`\`
  `;

}
