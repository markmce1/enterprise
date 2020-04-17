import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './data/data.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '',component: DataComponent },
  {path: 'add',component:StartComponent, canActivate:[AuthGuard]},
  {path: 'edit/:listingId',component:StartComponent , canActivate:[AuthGuard]},
  { path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
