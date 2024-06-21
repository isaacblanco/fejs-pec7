import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationSuccessMessage: string = ""; // Mensaje de éxito

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
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

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.username,
          this.registerForm.value.password
        )
        .subscribe({
          next: (response) => {
            console.log("Registration successful", response);
            this.registrationSuccessMessage = "Registration successful!"; // Establecer el mensaje de éxito
          },
          error: (error) => {
            console.error("Registration failed", error);
            this.registrationSuccessMessage =
              "No se ha podido registrar al usario, tal vez ya exista"; // Limpiar el mensaje si hay error
          },
        });
    }
  }
}
