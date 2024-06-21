import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { ArticleService } from "src/app/core/services/article.service";
import { Article } from "src/app/shared/models/article";

@Component({
  selector: "app-article-detail",
  templateUrl: "./article-detail.component.html",
  styleUrls: ["./article-detail.component.css"],
})
export class ArticleDetailComponent implements OnInit {
  article: Article;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get("id");
      this.loadArticle(id);
    });
  }

  loadArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe((article) => {
      this.article = article;
    });
  }

  goBack(): void {
    this.router.navigate(["/article/list"]);
  }

  editArticle(articleId: number): void {
    if (!this.isLoggedIn) return;
    this.router.navigate(["/article/edit", articleId]);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
