import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { ArticleDetailComponent } from "./articles/article-detail/article-detail.component";
import { ArticleItemComponent } from "./articles/article-item/article-item.component";
import { ArticleListComponent } from "./articles/article-list/article-list.component";
import { ArticleNewReactiveComponent } from "./articles/article-new-reactive/article-new-reactive.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ImageArticlePipe } from "./pipes/image-article.pipe";

import { AppRoutingModule } from "./app-routing.module";

// Core module
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArticleListComponent,
    ArticleNewReactiveComponent,
    ArticleItemComponent,
    ImageArticlePipe,
    LoginComponent,
    RegisterComponent,
    ArticleDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
  ],
  exports: [ArticleDetailComponent, ArticleItemComponent, ArticleListComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
