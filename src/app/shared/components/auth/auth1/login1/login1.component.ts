import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationRequest } from 'src/app/shared/models/authenticationRequest.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component implements OnInit {

  /*===== Variables =====*/
  hide = true;   
  faUser = faUser; 
  faLock = faLock;
  // signinForm: FormGroup;

  signinForm: FormGroup  = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  }); 

  constructor(
    // private _builder: FormBuilder,    
    private router:Router,
    private authService: AuthService,
    private authenticationRequest: AuthenticationRequest
  ) {

    // this.signinForm = this._builder.group({     
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],      
    // })

  } 

  ngOnInit(): void {
    this.signinForm.controls['username'].valueChanges.subscribe(data => this.authenticationRequest.email = data)
    this.signinForm.controls['password'].valueChanges.subscribe(data => this.authenticationRequest.password = data)    
  }
  
  /*===== Get Inputs FormGroup =====*/
  get username(){
    return this.signinForm.get('username');
  }  
  
  get password(){
    return this.signinForm.get('password');
  }  

  /*===== Validators =====*/
  getErrorMessageRequired() {        
      return 'El campo es requerido.';         
  }  

  /*===== Functions =====*/
  formSubmit(){
    this.authService.generateToken(this.authenticationRequest).subscribe(
      (data: any) => {
        this.authService.setToken(data.body.token);
        
        this.authService.setUser(data.body.userActive);

        if(this.authService.getUserRole() == 'ADMIN'){
          // Dashboard Admin
          window.location.href = '/dashboard';
          this.router.navigate(['admin']);
          this.authService.loginStatusSubjec.next(true);
        }
        else if(this.authService.getUserRole() == 'USER'){
          //Dashboard User
          window.location.href = '/dashboard';
          this.router.navigate(['user']);
          this.authService.loginStatusSubjec.next(true);
        }
        else{
          this.authService.logout();
          console.log("logout");
          
        }
      },(error: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Detalles Inválidos.'
        })
      }    
    );
  }

}
