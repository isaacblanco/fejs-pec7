import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ArticleDetailComponent } from "./articles/article-detail/article-detail.component";
import { ArticleListComponent } from "./articles/article-list/article-list.component";
import { ArticleNewReactiveComponent } from "./articles/article-new-reactive/article-new-reactive.component";
import { AuthGuard } from "./auth/guards/auth.guard"; // Asegúrate de ajustar la ruta de importación correctamente
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

const routes: Route[] = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "article/list", component: ArticleListComponent },
  {
    path: "article/create",
    component: ArticleNewReactiveComponent,
    canActivate: [AuthGuard], // Usar AuthGuard aquí
  },
  { path: "article/:id", component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
