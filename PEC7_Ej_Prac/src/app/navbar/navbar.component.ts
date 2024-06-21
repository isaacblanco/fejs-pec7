import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthStoreService } from "src/app/core/services/auth-store.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  constructor(
    public authStoreService: AuthStoreService,
    private router: Router
  ) {}

  logout(): void {
    this.authStoreService.clearToken(); // Asumiendo que clearToken es el método para hacer logout
    this.router.navigate(["/login"]); // Redirige al usuario a la página de login
  }
}
