import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthStoreService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkInitialAuth();
  }

  private checkInitialAuth() {
    const token = localStorage.getItem("authToken");
    this._isLoggedIn.next(!!token);
  }

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  setToken(token: string): void {
    localStorage.setItem("authToken", token);
    this._isLoggedIn.next(true);
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
    this._isLoggedIn.next(false);
  }

  isLoggedInDirect(): boolean {
    return !!localStorage.getItem("authToken");
  }
}
