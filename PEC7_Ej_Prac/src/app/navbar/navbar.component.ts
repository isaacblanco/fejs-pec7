import { Component } from "@angular/core";
import { AuthStoreService } from "src/app/core/services/auth-store.service"; // Asegúrate de que la ruta es correcta

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  constructor(public authStoreService: AuthStoreService) {}
}
