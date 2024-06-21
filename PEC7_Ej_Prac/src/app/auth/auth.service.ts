import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl = "http://localhost:3000/api/user/login";
  private registerUrl = "http://localhost:3000/api/user/register";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      tap((response) => this.setSession(response)) // Guardar token al iniciar sesión
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(this.registerUrl, { username, password });
  }

  private setSession(authResult): void {
    localStorage.setItem("authToken", authResult.token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("authToken");
  }

  logout(): void {
    localStorage.removeItem("authToken");
  }
}
