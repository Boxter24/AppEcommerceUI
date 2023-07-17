import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthenticationRequest } from '../models/authenticationRequest.model';
import baseUrl from '../utils/api/route-api';
import { CreateUser } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    /*===== Variables =====*/
    public loginStatusSubjec = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        // private cambiarFotoService: CambiarFotoService
    ) { }

    generateToken(authenticationRequest: AuthenticationRequest): any{
        return this.http.post(`${baseUrl}/ecommerce/auth/authenticate`,authenticationRequest);
    }

    registerNewUser(newUser: CreateUser): any{
        return this.http.post(`${baseUrl}/ecommerce/auth/register`,newUser);
    }

    //inicio de sesión
    setToken(token: any){
        localStorage.setItem('token',token);
    }

    isLoggedIn(): boolean{
        let tokenStr = localStorage.getItem('token');

        if(tokenStr == null || tokenStr == undefined || tokenStr == ''){
        return false;
        }
        
        return true;
    }

    //Cierre de Sesión
    logout(): boolean{
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return true;
    }

    //Obtencion del token
    getToken(): any{
        return localStorage.getItem('token');
    }

    setUser(user: any): void{
        localStorage.setItem('user',JSON.stringify(user));
    }

    getUser(): any{
        let userStr = localStorage.getItem('user');
        
        if(userStr != null){
        return JSON.parse(userStr);
        }else{
        this.logout();
        return null;
        }
    }

    getUserRole(){
        let user = this.getUser();

        return user.authorities[0].authority;
    }

    //limpieza de local storage
    clearStorage(){
        localStorage.clear();
    }

}