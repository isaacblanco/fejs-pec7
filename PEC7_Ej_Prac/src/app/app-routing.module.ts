import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleNewReactiveComponent } from './components/article-new-reactive/article-new-reactive.component';
import { ArticleNewTemplateComponent } from './components/article-new-template/article-new-template.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
  },
  {
    path: 'new-template',
    component: ArticleNewTemplateComponent,
  },
  {
    path: 'new-reactive',
    component: ArticleNewReactiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
