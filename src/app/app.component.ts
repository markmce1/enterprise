import { Component, OnInit } from '@angular/core';
import { Authservice } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: Authservice) {}
  ngOnInit(){
    this.authService.autoAuthUser();
  }
  

}
