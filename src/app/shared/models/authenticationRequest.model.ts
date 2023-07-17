import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationRequest {
    email!: string;
    password!: string;
}