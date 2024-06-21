import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; // Declarar la variable para el formulario

  constructor() {}

  ngOnInit(): void {
    // Inicializar el formulario con los controles y validadores
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
    // Aquí puedes implementar la lógica de registro
    if (this.registerForm.valid) {
      console.log("Registration data:", this.registerForm.value);
      // Aquí se podría llamar a un servicio de registro, etc.
    }
  }
}
