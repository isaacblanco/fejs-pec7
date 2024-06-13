import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatoMoneda",
})
export class FormatoMonedaPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== "number") {
      return value;
    }
    return value.toFixed(2) + " €";
  }
}
