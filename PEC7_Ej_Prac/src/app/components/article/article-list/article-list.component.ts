import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from "rxjs/operators";
import { Article } from "src/app/models/article";
import { ArticleQuantityChange } from "src/app/models/article-quantity-change";
import { ArticleServiceService } from "src/app/services/article-service.service";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent implements OnInit {
  articles$: Observable<Article[]> | undefined;
  searchForm: FormGroup;

  constructor(
    private articleService: ArticleServiceService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      query: [""],
    });
  }

  ngOnInit() {
    this.articles$ = this.searchForm.get("query")!.valueChanges.pipe(
      startWith(""), // Emit the initial value for the search input
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.articleService.getArticles(query))
    );
  }

  emitirIncrementoCantidad(article: Article) {
    article.quantityInCart++;
  }

  emitirDecrementarCantidad(article: Article) {
    if (article.quantityInCart > 0) {
      article.quantityInCart--;
    }
  }

  cambiosEnLaCantidad(event: ArticleQuantityChange) {
    const article = event.article;
    const changeInQuantity = event.changeInQuantity;

    if (changeInQuantity > 0) {
      this.emitirIncrementoCantidad(article);
    } else {
      this.emitirDecrementarCantidad(article);
    }
  }
}
