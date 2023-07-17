import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faEnvelope, faLock, faPhone, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { CreateUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component implements OnInit {

  /*===== Variables =====*/
  hide = true;
  faUser = faUser; 
  faEnvelope = faEnvelope; 
  faLock = faLock;
  faPencilAlt = faPencilAlt;
  formMode: boolean = true;  
  signupForm: FormGroup  = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  }); 
  user?: CreateUser;

  constructor(
    // private _builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    // this.signupForm = this._builder.group({
    //   fullname: ['', Validators.required],
    //   email: ['', Validators.compose([Validators.required, Validators.email])],
    //   password: ['', Validators.required],
    // })

  } 

  ngOnInit(): void {
    this.signupForm.controls['fullname'].valueChanges.subscribe(data => console.log("A"))
    this.signupForm.controls['email'].valueChanges.subscribe(data => this.user!.email = data)
    this.signupForm.controls['password'].valueChanges.subscribe(data => this.user!.password = data)
  }

  /*===== Get Inputs FormGroup =====*/
  get fullname(){
    return this.signupForm.get('fullname');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }


  /*===== Validators =====*/
  getErrorMessageRequired() {        
      return 'El campo es requerido.';         
  }

  getErrorMessageEmail() {
    if (this.signupForm.controls['email'].hasError('required')) {      
      return 'Debe ingresar un correo.';
    }
    
    return this.signupForm.controls['email'].hasError('email') ? 'Debe ingresar un correo válido' : '';
  }  

  formSubmit(){
    this.signupForm.removeControl('id', { emitEvent: false });
    this.user = this.signupForm.getRawValue();

    if(this.signupForm.valid){
      this.authService.registerNewUser(this.user!).subscribe(
        (data: any) => {
          Swal.fire(
            'Succesfully',
            'Account create in the system!!!',
            'success'
          )
          .then(() => {
            this.authService.setToken(data.body.token);
        
            this.authService.setUser(data.body.userActive);

            if(this.authService.getUserRole() == 'ADMIN'){
              // Dashboard Admin
              window.location.href = '/dashboard';
              this.authService.loginStatusSubjec.next(true);
            }
            else if(this.authService.getUserRole() == 'USER'){
              //Dashboard User
              window.location.href = '/dashboard';
              this.authService.loginStatusSubjec.next(true);
            }
            else{
              this.authService.logout();
            }
          });
        }
      );
    }
  }

}
