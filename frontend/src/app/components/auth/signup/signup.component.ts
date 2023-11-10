import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private formbuilder: FormBuilder){}
  
  signupForm = this.formbuilder.group({
    username:[''],
    email:[''],
    password:[''],
    confirm_password:['']
  }) 

  onSubmit(){
    console.log(this.signupForm.value)
  }
}
