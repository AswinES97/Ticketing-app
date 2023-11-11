import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/)]]
  })

  getEmail(){
    return this.loginForm.get('email')
  }

  getPassword(){
    return this.loginForm.get('password')
  }

  mailErrorCondition(){
    return this.getEmail()?.touched && this.getEmail()?.invalid 
  }

  passwordErrorCondition(){
    return this.getPassword()?.touched && this.getPassword()?.invalid 
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe()
    }else{
      this.loginForm.markAllAsTouched()
      this.loginForm.markAsDirty()
    }
  }
}
