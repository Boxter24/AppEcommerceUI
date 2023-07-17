import { Component, OnInit } from '@angular/core';
import { DataComponentEcommerce } from 'src/app/shared/models/dataComponent.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-carousel1',
  templateUrl: './carousel1.component.html',
  styleUrls: ['./carousel1.component.css']
})
export class Carousel1Component implements OnInit {

  /*===== Variables =====*/
  edit: boolean = false;
  dataList: DataComponentEcommerce[] = [];
  urlImages: string[] = [];

  constructor(private _storage: Storage) { }

  ngOnInit(): void {
  }

  editMode(){
    this.edit = true;
  }

  data(data: DataComponentEcommerce[]): void{
    this.dataList = data;
    this.getImage();
  }

  async getImage(): Promise<void>{
    this.urlImages = [];

    for(let i = 1; i < this.dataList.length; i++){
      const imgRef = ref(this._storage, `images/ecommerce/${this.dataList[i].data}`);

      const urlImg = await getDownloadURL(imgRef);

      this.urlImages.push(urlImg)
    }
  }

}
