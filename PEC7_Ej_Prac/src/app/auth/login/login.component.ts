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
  loginMessage: string = ""; // Mensaje de éxito o fracaso

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
            this.loginMessage = "Login successful!";
            this.router.navigate(["/article/list"]);
          },
          error: (error) => {
            console.error("Login failed", error);
            this.loginMessage =
              "Login failed. Please check your username and password.";
          },
        });
    } else {
      this.loginMessage = "Please fill in all fields correctly.";
    }
  }
}
