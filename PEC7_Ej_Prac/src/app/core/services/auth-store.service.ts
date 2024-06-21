import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private _isLoggedIn: boolean = false;

  constructor() {
    this._isLoggedIn = !!this.getToken();
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  setToken(token: string): void {
    localStorage.setItem("authToken", token);
    this._isLoggedIn = true;
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
    this._isLoggedIn = false;
  }
}
