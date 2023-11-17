import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-haandler.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isDisabled: boolean = false
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private toaster: ToastrService,
    private errorhandler: ErrorHandlerService,
    private router: Router
    ) { }

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
    if(this.loginForm.valid){      
      this.isDisabled = true
      this.authService.login(this.loginForm.value)
      .pipe(
        retry(3),
        catchError(err=>{
          this.isDisabled = false
          return this.errorhandler.handleError(err,this.toaster)
        })
      )
      .subscribe(data=>{
        const response = data as responseData
        const payload = jwtDecode(response.token)
        
        localStorage.setItem('token', response.token)
        this.router.navigate(['/'])
    })
    }else{
      this.isDisabled = false
      this.loginForm.markAllAsTouched()
      this.loginForm.markAsDirty()
    }
  }
}

type responseData = {
  token: string
}
