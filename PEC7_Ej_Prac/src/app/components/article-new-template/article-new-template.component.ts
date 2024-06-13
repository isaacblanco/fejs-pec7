import { Component } from '@angular/core';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrls: ['./article-new-template.component.scss'],
})
export class ArticleNewTemplateComponent {
  article = {
    name: '',
    imageUrl: '',
    price: null, // Ensure this is initially set to a number or null for a numeric input
    onSale: false, // Correct type for boolean values
  };
  submitted = false;

  onSubmit(form: any) {
    this.submitted = true;
    if (form.valid) {
      console.log('Form Value:', this.article);
    } else {
      console.log('Form is not valid');
    }
  }
}
