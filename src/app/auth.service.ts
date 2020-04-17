import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Authservice {
    private token:string;
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();


    constructor(private http: HttpClient) {}

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getAuthStatus(){    
        return this.isAuthenticated;

    }

    createUser(email: string, password: string)
    {
        const authData: AuthData = {email:email, password:password};
        this.http.post("http://localhost:3000/api/auth/signup", authData)
        .subscribe(response => {

        });
    };
    login(email:string, password:string ){
        const authData: AuthData = {email:email, password:password};
        this.http.post<{token: string}>("http://localhost:3000/api/auth/login", authData)
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if(token){
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
            }
        
        });
    }
};