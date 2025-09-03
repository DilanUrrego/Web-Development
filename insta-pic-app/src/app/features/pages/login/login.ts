import { Component , inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router) {}
 
    fb = inject(FormBuilder);
    validators = [Validators.required, Validators.minLength(4)];

    signInForm = this.fb.group({
        username:['', [Validators.required]],
        password:['', this.validators],
      })

    onSignIn(){
      if(!this.signInForm.valid){
        alert('Faltan campos por diligenciar');
        return;
      }

      let localUser = this.signInForm.value;
      console.log(localUser);

      if(localStorage.getItem(localUser.username!)){
        const userValue: string | null = localStorage.getItem(localUser.username!)

        if(userValue){
          const userObj = JSON.parse(userValue)
          if(userObj.password == localUser.password){
            alert("Bienvenido al sitio");
            this.router.navigate(['/home'])
            
            
          }
          else{
            alert("Contrasena incorrecta");
          }
        }
    }
    else{
      alert("Usuario incorrecto");
    }
  }
}