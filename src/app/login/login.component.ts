import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isloading = false;

  constructor( public authService: Authservice){}

  onLogin(form:NgForm)
  {
    if(form.invalid){
      return;
    }
    this.isloading = true;
    this.authService.login(form.value.email,form.value.password)  
  }
  


}
