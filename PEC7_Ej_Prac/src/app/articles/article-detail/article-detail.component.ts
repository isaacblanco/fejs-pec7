import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticleService } from "src/app/core/services/article.service";
import { Article } from "src/app/shared/models/article";

@Component({
  selector: "app-article-detail",
  templateUrl: "./article-detail.component.html",
  styleUrls: ["./article-detail.component.css"],
})
export class ArticleDetailComponent implements OnInit {
  article: Article; // Almacena los detalles del artículo

  constructor(
    private articleService: ArticleService, // Servicio para obtener los datos del artículo
    private route: ActivatedRoute // Servicio para acceder a los parámetros de la ruta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get("id"); // Obtiene el ID del artículo de la URL
      this.loadArticle(id);
    });
  }

  private loadArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe((article) => {
      this.article = article; // Guarda el artículo obtenido en la propiedad
    });
  }
}
