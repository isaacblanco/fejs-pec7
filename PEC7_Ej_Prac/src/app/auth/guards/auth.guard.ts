import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthStoreService } from "src/app/core/services/auth-store.service"; // Asegúrate de ajustar la ruta de importación correctamente

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authStore: AuthStoreService) {}

  canActivate(): boolean {
    if (this.authStore.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
