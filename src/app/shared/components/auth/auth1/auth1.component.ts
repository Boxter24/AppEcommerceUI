import { Component, OnInit } from '@angular/core';
import  {FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faEnvelope, faLock, faPhone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './auth1.component.html',
    styleUrls: ['./auth1.component.css']
})
export class Auth1Component implements OnInit {

    /*===== Variables =====*/
    hide = true;
    faUser = faUser; 
    faEnvelope = faEnvelope; 
    faLock = faLock;
    faPhone = faPhone;
    faPencilAlt = faPencilAlt;
    formMode: boolean = true;  

    constructor(private router: Router) { }

    ngOnInit(): void {
        if(this.router.url.includes('login')){
            this.form();
        }
    }  

    email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessageEmail() {
        if (this.email.hasError('required')) {      
        return 'Debe ingresar un correo.';
        }
        
        return this.email.hasError('email') ? 'Debe ingresar un correo válido' : '';
    }

    form(): void{
        this.formMode = !this.formMode;
    } 

}
