import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private _isLoggedIn: boolean = false;

  constructor() {
    this._isLoggedIn = !!this.getToken(); // Inicializa el estado basado en la presencia del token
  }

  setIsLoggedIn(value: boolean): void {
    this._isLoggedIn = value;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  setToken(token: string): void {
    localStorage.setItem("authToken", token);
    this.setIsLoggedIn(true);
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
    this.setIsLoggedIn(false);
  }
}
