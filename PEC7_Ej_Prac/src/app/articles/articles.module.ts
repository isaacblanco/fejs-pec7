import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleNewReactiveComponent } from "./article-new-reactive/article-new-reactive.component";

const routes: Routes = [
  { path: "list", component: ArticleListComponent },
  {
    path: "create",
    component: ArticleNewReactiveComponent,
    canActivate: [AuthGuard],
  },
  { path: ":id", component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
