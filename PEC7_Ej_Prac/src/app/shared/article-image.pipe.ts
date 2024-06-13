import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "articleImage",
})
export class ArticleImagePipe implements PipeTransform {
  transform(imageUrl: string): string {
    return imageUrl ? "/" + imageUrl : "/assets/images/nothing.jpg";
  }
}
