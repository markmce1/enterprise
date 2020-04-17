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
    mobile = false;
    constructor(private authService: Authservice) {

    }
    ngOnInit(){
       
        if (window.screen.width === 360) { // 768px portrait
            this.mobile = true;
        }
        this.userIsAuthenticated = this.authService.getAuthStatus();
        this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated =>{
            this.userIsAuthenticated = isAuthenticated;
        })

    }
    ngOnDestroy(){
        this.authListenerSubs.unsubscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}