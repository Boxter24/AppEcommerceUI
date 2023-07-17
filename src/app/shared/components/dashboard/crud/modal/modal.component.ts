import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/shared/services/crud.service';
import { findElement } from 'src/app/shared/utils/jsons/data.crud.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /*===== Variables =====*/
  form: FormGroup;
  element: {[k: string]: any} = {};
  find = findElement(this.data.url);
  formControlNames = this.find?.formControlName;
  titleSingular = this.find?.singular;
  nameRelation = this.find?.nameRelation;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _builder: FormBuilder,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this._builder.group({});

    //Create FormGroup
    this.form.addControl('id', new FormControl());
    this.formControlNames?.forEach(name => {
      this.form.addControl(name[0], new FormControl())
      //Add FonrControlName and Validators
      this.form.controls[name[0]].setValidators(name[1] != 'email' ? Validators.required : Validators.compose([Validators.email, Validators.required])!);
      //Initialize data
      this.element[name[0]] = ''
    })
  }

  ngOnInit(): void {
    let relation: string | undefined;
    if(this.form.controls['active']){
      this.form.controls['active'].setValue(false);
    }
    //Add data element edit
    if(this.data.accion == 'Edit'){
      this.form.controls["id"].setValue(this.data.edit.id);
      this.formControlNames?.forEach(name => {
        if(this.nameRelation){
          relation = this.nameRelation!.find((e) => e.key == name[0])?.name;
        }
        
        if(relation){
          console.log(this.form.controls[name[0]].get);
          this.form.controls[name[0]].setValue(this.data.edit[name[0]]);
        }
        else{
          this.form.controls[name[0]].setValue(this.data.edit[name[0]]);
        }

        relation = '';
      })
    }
  } 

  /*===== Get Inputs FormGroup =====*/
  get getActive(){
    return this.form.get('active')?.value;
  }

  dataElement(e: string){
    return this.form.get(e)?.errors;
  }   

  /*===== Validators =====*/
  getErrorMessageRequired() {
    return 'El campo es requerido.';
  }

  getErrorMessageEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'Debe ingresar un correo.';
    }
    
    return this.form.controls['email'].hasError('email') ? 'Debe ingresar un correo válido' : '';
  }  


  compareFn(option1: {[k: string]: any}, option2: {[k: string]: any}): boolean {
    return option1 && option2 ? option1['id'] === option2['id'] : option1 === option2;
  }

  formSubmit(): void {
    if(this.form.valid){
      if(this.data.accion == 'Create'){
        this.form.removeControl('id', { emitEvent: false });
        this.element = this.form.getRawValue();
        this.crudService.createNewElement(this.element).subscribe({
          complete: () => {
            Swal.fire(
              this.titleSingular + ' Save',
              this.titleSingular + ' successfully create!!',
              'success'
            ).then(
              (e) => {
                this.dialogRef.close();
              }
            );
          },
          error: () => {
            Swal.fire(
              'Error',
              this.titleSingular + ' Not Create',
              'error'
            ).then(
              (e) => {
                this.dialogRef.close();
              }
            );
          },
        });
      }
      else{
        this.element = this.form.getRawValue();
        this.crudService.updateElement(this.element).subscribe({
          complete: () => {
            Swal.fire(
              this.titleSingular + ' Update',
              this.titleSingular + ' successfully Update!!',
              'success'
            ).then(
              (e) => {
                this.dialogRef.close();
              }
            );
          },
          error: () => {
            Swal.fire(
              'Error',
              this.titleSingular + ' Not Update',
              'error'
            ).then(
              (e) => {
                this.dialogRef.close();
              }
            );
          },
        });
      }
    }
  }
}
