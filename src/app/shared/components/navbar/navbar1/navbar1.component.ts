import { Component, OnInit } from '@angular/core';
import { faUser, faShoppingBag, faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DataComponentEcommerce } from 'src/app/shared/models/dataComponent.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})
export class Navbar1Component implements OnInit {

  /*===== Variables =====*/
  faUser = faUser;
  faShoppingBag = faShoppingBag;
  faBars = faBars;
  faWindowClose = faWindowClose;
  open: boolean = false;
  edit: boolean = false;
  dataList: DataComponentEcommerce[] = [];

  constructor(private _storage: Storage) { }

  ngOnInit(): void {
  }

  openNavside(): void {
    this.open = !this.open
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
