import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SignupComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
