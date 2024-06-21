import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable, Subject, merge } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";

import { ArticleService } from "src/app/core/services/article.service";
import { Article } from "src/app/shared/models/article";
import { ArticleQuantityChange } from "src/app/shared/models/article-quantity-change";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"],
})
export class ArticleListComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public searchForm: FormControl;
  private searchTerms: Subject<string> = new Subject<string>();
  private reloadArticleList: Subject<void> = new Subject<void>();

  constructor(
    private articleService: ArticleService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.control("", Validators.required);
  }

  ngOnInit() {
    this.articles$ = merge(
      this.searchTerms.pipe(
        startWith(""),
        debounceTime(500),
        distinctUntilChanged()
      ),
      this.reloadArticleList.pipe(map(() => this.searchForm.value || ""))
    ).pipe(switchMap((term: string) => this.articleService.getArticles(term)));
  }

  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService
      .changeQuantity(change.article.id, change.changeInQuantity)
      .subscribe((res) => {
        console.log(res.msg);
        this.reloadArticleList.next();
      });
  }

  search() {
    this.searchTerms.next(this.searchForm.value);
  }

  onNew() {
    this.reloadArticleList.next();
  }
}
