import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";

import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleItemComponent } from "./article-item/article-item.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleNewReactiveComponent } from "./article-new-reactive/article-new-reactive.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ImageArticlePipe } from "./pipes/image-article.pipe";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";

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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
