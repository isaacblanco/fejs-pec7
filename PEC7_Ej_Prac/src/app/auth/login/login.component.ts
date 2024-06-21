import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Declarar la variable para el formulario

  constructor() {}

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
    // Aquí puedes implementar la lógica de autenticación
    if (this.loginForm.valid) {
      console.log("Login data:", this.loginForm.value);
      // Llamar a un servicio de autenticación, etc.
    }
  }
}
