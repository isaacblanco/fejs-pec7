import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleQuantityChange } from 'src/app/models/article-quantity-change';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
})
export class ArticleItemComponent {
  @Input() article!: Article;
  @Output() quantityChange = new EventEmitter<ArticleQuantityChange>();

  emitirIncrementoCantidad() {
    this.quantityChange.emit({ article: this.article, changeInQuantity: 1 });
  }

  emitirDecrementarCantidad() {
    this.quantityChange.emit({ article: this.article, changeInQuantity: -1 });
  }
}
