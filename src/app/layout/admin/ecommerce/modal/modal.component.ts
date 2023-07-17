import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { findElement } from 'src/app/shared/utils/jsons/dataEditComponentEcommerce.json';
import Swal from 'sweetalert2';
import { Storage, deleteObject, ref, uploadBytes } from '@angular/fire/storage'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /*===== Variables =====*/
  form: FormGroup;
  element: {[k: string]: any} = {};
  title: string = '';
  formControlNames: string[][] = [];
  file?: File;
  imgAux: string = '';
  listImage?: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _builder: FormBuilder,
    private _preferenceService: PreferencesService,
    private _storage: Storage,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this._builder.group({});

    let find = findElement(data.type);

    this.title = find?.type!;
    this.formControlNames = find?.formControl!;

    //Create FormGroup
    this.formControlNames?.forEach(name => {      
      this.form.addControl(name[0], new FormControl())
      //Add FonrControlName and Validators
      if(name[2]){
        this.form.controls[name[0]].setValidators(Validators.required);
      }
      else{
        this.form.controls[name[0]];
      }
      //Initialize data
      this.element[name[0]] = '';
    })
  }

  ngOnInit(): void {
    let relation: string | undefined;
    let i = 0;
    //Add data element edit
    if(this.data.dataComponent.dataList.length != 0){
      // this.form.controls["id"].setValue(this.data.edit.id);
      this.formControlNames?.forEach(name => {
        this.form.controls[name[0]].setValue(this.data.dataComponent.dataList[i] ? this.data.dataComponent.dataList[i].data : '');

        if(name[0] == 'image'){
          this.imgAux = this.data.dataComponent.dataList[i].data;
        }
        i++
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

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(this.title == 'carousel'){
      this.listImage!.push(this.file!.name)
      this.form.removeControl('image');
    }
    else{
      this.form.controls['image'].setValue(this.file!.name)
    }
  }

  formSubmit(): void {
    let sendData: any[] = []
    let c = {
      index: this.data.index,
    };


    if(this.form.valid){
      //Values FormControl
      this.element = this.form.getRawValue();

      //Values ListImage
      this.listImage?.forEach((e , index) => {
        //Initialize data
        this.element[`name${index}`] = e;
      })

      //Add All Values
      for (let clave in this.element){
        sendData.push({
          data: this.element[clave],
          componentEcommerce: c
        });
      }

      this._preferenceService.updateDataLayout(sendData).subscribe({
        complete: () => {
          Swal.fire(
            'Update',
            'Component successfully Update!!',
            'success'
          ).then(
            (e) => {
              if(this.file){
                const imgRef = ref(this._storage, `images/ecommerce/${this.file!.name}`)

                if(this.imgAux != '' && this.imgAux != this.file!.name){
                  const imgAuxRef = ref(this._storage, `images/ecommerce/${this.imgAux}`)
                  deleteObject(imgAuxRef)
                  .catch(err => console.log(err))
                }

                uploadBytes(imgRef, this.file!)
                .then(e => {
                  this._preferenceService.setdataListComponent(sendData);
                  // this._loaderService.hideLoader();
                })
                .catch(err => console.log(err))
              }
              else{
                this._preferenceService.setdataListComponent(sendData)
              }
              this.dialogRef.close()
            }
          );
        },
        error: () => {
          Swal.fire(
            'Error',
            'Component Not Update',
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
