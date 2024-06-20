import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtener el token de autenticación desde algún lugar de almacenamiento
    const authToken = localStorage.getItem("authToken");

    // Clonar la solicitud para añadir el nuevo encabezado
    const authReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        authToken ? `Bearer ${authToken}` : ""
      ),
    });

    // Enviar la solicitud clonada con el encabezado de autorización
    return next.handle(authReq);
  }
}
