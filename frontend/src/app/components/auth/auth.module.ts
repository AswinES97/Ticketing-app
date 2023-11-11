import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    SignupComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
