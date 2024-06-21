import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declarar la variable para el formulario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Inicializar el formulario con los controles y validadores
    this.loginForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            console.log("Login successful", response);
            localStorage.setItem("authToken", response.token); // Guarda el token recibido
            this.router.navigate(["article/list"]); // Redireccionar a article/list
          },
          error: (error) => {
            console.error("Login failed", error);
          },
        });
    } else {
      console.error("Formulario inválido");
    }
  }
}
