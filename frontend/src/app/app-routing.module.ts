import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailSentComponent } from './components/auth/email-sent/email-sent.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate } from './authGuard/canActivate';

const routes: Routes = [{
  path:'',
  component: HomeComponent
},{
  path: 'auth', 
  loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
  canActivate: [canActivate]
},{
  path: 'email-sent',
  component: EmailSentComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
