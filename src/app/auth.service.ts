import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class Authservice {
    private token:string;
    private tokenTimer: any;
    private authId: string;
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();


    constructor(private http: HttpClient, private router: Router) {}

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getAuthStatus(){    
        return this.isAuthenticated;

    }
    getAuthId(){
        return this.authId;
    }

    createUser(email: string, password: string)
    {
        const authData: AuthData = {email:email, password:password};
        this.http.post("http://localhost:3000/api/auth/signup", authData)
        .subscribe(response => {
            this.router.navigate(['/login']);

        });
    };
    login(email:string, password:string ){
        const authData: AuthData = {email:email, password:password};
        this.http.post<{token: string, expiresIn:number, authId:string}>("http://localhost:3000/api/auth/login", authData)
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if(token){
                const expriesInDuration = response.expiresIn;
                this.setAuthTimer(expriesInDuration);
                this.isAuthenticated = true;
                this.authId = response.authId;
                this.authStatusListener.next(true);
                const now =new Date();
                const expirationDate = new Date(now.getTime() + expriesInDuration * 1000);
                this.saveAuthData(token, expirationDate,this.authId);
                this.router.navigate(['/']);
            }
        
        });
    }
    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.authId = null;
        this.router.navigate(['/']);
        clearTimeout(this.tokenTimer);
    
    }
    autoAuthUser(){
        const authInformation = this.getAuthData();
        if(!authInformation){
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if(expiresIn > 0){
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.authId = authInformation.authId;
            this.setAuthTimer(expiresIn/ 1000);
            this.authStatusListener.next(true);
        }
    }
    private getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const authId = localStorage.getItem("authId");
        if(!token  || !expirationDate){
            return;
        }
        return {
            token:token,
            expirationDate: new Date(expirationDate),
            authId: authId
        }
    }
    private setAuthTimer(duration: number){
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        },duration*1000)
    }
    private saveAuthData(token: string, expirationDate: Date, authId:string)
    {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem("authId", authId )
    }
    private clearAuthData () {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("authId");
    }
};