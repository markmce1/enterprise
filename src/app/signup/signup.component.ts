import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isloading = false;

  constructor(public authservice: Authservice) {}

  onSignup(form:NgForm)
  {
    if(form.invalid){
      return;
    }
    this.isloading = true;
    this.authservice.createUser(form.value.email, form.value.password);
  }

}
