import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(Auth);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group({
    username:['jjzapata', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  }, { validators: matchPasswordsValidator('password', 'rePassword') })


  onSignUp() {
    if (!this.signUpForm.valid) {

      if (this.signUpForm.hasError('passwordMismatch')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden',
        });
        return;
      }

      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Faltan campos por diligenciar',
      });
      return;
    }

    let user = this.signUpForm.value as User;
    let signUpResponse = this.authService.signUp(user);

    if (!!signUpResponse.success) {
      this.router.navigate([signUpResponse.redirectTo]);
      return;
    }

    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: signUpResponse.message,
    });
  }
}

export function matchPasswordsValidator(passwordKey: string, rePasswordKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const rePassword = formGroup.get(rePasswordKey)?.value;

    if (password && rePassword && password !== rePassword) {
      formGroup.get(rePasswordKey)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };
}