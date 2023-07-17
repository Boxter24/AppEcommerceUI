import { Component, OnInit } from '@angular/core';
import { DataComponentEcommerce } from 'src/app/shared/models/dataComponent.model';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.css']
})
export class Section1Component implements OnInit {

  /*===== Variables =====*/
  edit: boolean = false;
  dataList: DataComponentEcommerce[] = [];
  urlImg: string = '';

  constructor(private _storage: Storage) { }

  ngOnInit(): void {
  }

  editMode(){
    this.edit = true;
  }

  data(data: DataComponentEcommerce[]): void{
    this.dataList = data;
    if(this.dataList.length == 3){
      this.getImage(this.dataList[2].data.toString())
    }
  }

  async getImage(url: string): Promise<void>{
    this.urlImg = '';

    const imgRef = ref(this._storage, `images/ecommerce/${url}`);
    
    this.urlImg = await getDownloadURL(imgRef);
  }

}


