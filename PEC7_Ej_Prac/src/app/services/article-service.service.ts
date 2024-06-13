import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "./../models/article";

@Injectable({
  providedIn: "root", // Registrar el servicio a nivel global
})
export class ArticleServiceService {
  private apiUrl = "http://localhost:3000/api/articles";

  constructor(private http: HttpClient) {}

  getArticles(query?: string): Observable<Article[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set("q", query);
    }
    return this.http.get<Article[]>(this.apiUrl, { params });
  }

  changeQuantity(
    articleId: number,
    changeInQuantity: number
  ): Observable<Article> {
    return this.http.patch<Article>(`${this.apiUrl}/${articleId}`, {
      changeInQuantity,
    });
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }
}
