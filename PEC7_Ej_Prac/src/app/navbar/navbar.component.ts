import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthStoreService } from "src/app/core/services/auth-store.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  isLoggedIn: Observable<boolean>; // Manejar como Observable

  constructor(
    private authStoreService: AuthStoreService,
    private router: Router
  ) {
    this.isLoggedIn = this.authStoreService.isLoggedIn(); // Asignar directamente el Observable
  }

  logout(): void {
    this.authStoreService.clearToken();
    this.refreshLoginStatus();
    this.router.navigate(["/login"]);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.refreshLoginStatus();
  }

  private refreshLoginStatus(): void {
    this.isLoggedIn = this.authStoreService.isLoggedIn(); // Actualizar el estado de isLoggedIn
  }
}
