import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { ArticleDetailComponent } from "./articles/article-detail/article-detail.component";
import { ArticleListComponent } from "./articles/article-list/article-list.component";
import { ArticleNewReactiveComponent } from "./articles/article-new-reactive/article-new-reactive.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

import { AuthInterceptor } from "./core/interceptors/auth-interceptor";

const routes: Route[] = [
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Ruta por defecto
  { path: "login", component: LoginComponent }, // Ruta para login
  { path: "register", component: RegisterComponent }, // Ruta para registro
  { path: "article/list", component: ArticleListComponent }, // Ruta para ver lista de artículos
  {
    path: "article/create",
    component: ArticleNewReactiveComponent,
    canActivate: [AuthInterceptor],
  }, // Ruta protegida para crear artículos
  { path: "article/:id", component: ArticleDetailComponent }, // Ruta para detalles de artículo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
