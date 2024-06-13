import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms"; // Import FormsModule
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ArticleNewReactiveComponent } from "./components/article-new-reactive/article-new-reactive.component";
import { ArticleNewTemplateComponent } from "./components/article-new-template/article-new-template.component";
import { ArticleItemComponent } from "./components/article/article-item/article-item.component";
import { ArticleListComponent } from "./components/article/article-list/article-list.component";
import { HeaderComponent } from "./header/header.component";
import { FormatoMonedaPipe } from "./shared/formato-moneda.pipe";
import { ArticleImagePipe } from './shared/article-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArticleItemComponent,
    ArticleListComponent,
    HeaderComponent,
    ArticleNewTemplateComponent,
    ArticleNewReactiveComponent,
    FormatoMonedaPipe,
    ArticleImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ArticleItemComponent, ArticleListComponent],
})
export class AppModule {}
