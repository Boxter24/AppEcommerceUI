import { Component, OnInit } from '@angular/core';
import { DataComponentEcommerce } from 'src/app/shared/models/dataComponent.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  /*===== Variables =====*/
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

  getImage(url: String): Promise<string>{
    const imgRef = ref(this._storage, `images/ecommerce/${url}`);

    return getDownloadURL(imgRef);
  }

}
