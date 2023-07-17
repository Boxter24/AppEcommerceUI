import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataComponentEcommerce } from 'src/app/shared/models/dataComponent.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-footer1',
  templateUrl: './footer1.component.html',
  styleUrls: ['./footer1.component.css']
})
export class Footer1Component implements OnInit {
  
  /*===== Variables =====*/
  form: FormGroup  = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  }); 
  
  edit: boolean = false;
  dataList: DataComponentEcommerce[] = [];

  constructor(private _storage: Storage) { }

  ngOnInit(): void {
  }

  editMode(){
    this.edit = true;
  }

  data(data: DataComponentEcommerce[]): void{
    this.dataList = data;
  }

  /*===== Validators =====*/
  getErrorMessage() {
    if (this.form.get("email")?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get("email")?.hasError('email') ? 'Not a valid email' : '';
  }

  getImage(url: String): Promise<string>{
    const imgRef = ref(this._storage, `images/ecommerce/${url}`);

    return getDownloadURL(imgRef);
  }

}
