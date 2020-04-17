import { Component, OnInit, OnDestroy} from "@angular/core";
import { Authservice } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.scss']
    
})
export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;
    constructor(private authService: Authservice) {

    }
    ngOnInit(){
        this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated =>{
            this.userIsAuthenticated = isAuthenticated;
        })

    }
    ngOnDestroy(){

    }
}