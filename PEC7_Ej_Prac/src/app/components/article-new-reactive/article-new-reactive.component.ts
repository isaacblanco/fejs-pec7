import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Article } from "./../../models/article";
import { ArticleServiceService } from "./../../services/article-service.service";

@Component({
  selector: "app-article-new-reactive",
  templateUrl: "./article-new-reactive.component.html",
  styleUrls: ["./article-new-reactive.component.scss"],
})
export class ArticleNewReactiveComponent {
  articleForm: FormGroup;
  creationStatus$: Observable<Article | null> | null = null;
  creationError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleServiceService
  ) {
    this.articleForm = this.fb.group({
      name: ["", [Validators.required, this.nameArticleValidator]],
      price: ["", [Validators.required, Validators.min(0.1)]],
      imageUrl: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(https?://)?[a-zA-Z0-9-]+(.[a-zA-Z]{2,3})(/.*)?\\.(jpg|jpeg|png|gif)$"
          ),
        ],
      ],
      onSale: [false],
    });
  }

  nameArticleValidator(control: AbstractControl): ValidationErrors | null {
    const forbiddenNames = ["Prueba", "Test", "Fake"];
    if (forbiddenNames.includes(control.value)) {
      return { forbiddenName: true };
    }
    return null;
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const article: Article = {
        ...this.articleForm.value,
        quantityInCart: 0, // Assuming a default value for quantityInCart
      };
      this.creationStatus$ = this.articleService.create(article).pipe(
        map((response: Article) => {
          this.creationError = false;
          return response;
        }),
        catchError(() => {
          this.creationError = true;
          return of(null);
        })
      );
    } else {
      console.log("Form is not valid");
      this.articleForm.markAllAsTouched();
    }
  }
}
