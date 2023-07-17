import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { faAngleDoubleLeft, faAngleDoubleRight, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ComponentEcommerce } from 'src/app/shared/models/component.model';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { findElement, listSizeElementType } from 'src/app/shared/utils/jsons/ecommerceComponent.json';
import Swal from 'sweetalert2';
import { ModalComponent } from './modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ecommerce-admin',
  templateUrl: './ecommerce.admin.component.html',
  styleUrls: ['./ecommerce.admin.component.css']
})
export class EcommerceAdminComponent implements OnInit {
  index: number = -1;
  listComponents$: ComponentEcommerce[] = [];
  dataList$?: any[];
  
  sizeElementType: {type: string; size: number} = {type: "", size: 0};

  faArrowLeft = faAngleDoubleLeft;
  faArrowRight = faAngleDoubleRight;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  viewOrder: boolean = true;

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(
    private _preferences: PreferencesService,
    public dialog: MatDialog,
  ) {
    _preferences.listComponents$.subscribe(
      e => {
        this.listComponents$ = e!;
      }
    );

    _preferences.dataListComponent$.subscribe(
      async e => {
        this.dataList$ = e!;
        if(this.dataList$){
          let findComponent = this.listComponents$.find((e) => e.index == this.dataList$![0].componentEcommerce.index)
          this.listComponents$[findComponent!.index].dataList = this.dataList$;
          let component = await findElement(findComponent!.id!, findComponent!.type);
          this.removeComponent(findComponent!.index, true);
          this.addComponent(component, findComponent!.index);
        }
      }
    );
  }

  ngOnInit(): void {
    if(this.listComponents$.length > 0){

      this.index = this.listComponents$.length - 1

      for(let c of this.listComponents$){
        this.selectElement(c.type, false, c.id!, c.index, true);
      }
    }
  }

  async selectElement(type: string, change: boolean, id?: number, index?: number, initialList?: boolean): Promise<void>{

    let component;
    let componentSelected: ComponentEcommerce;

    if(id){
      this.sizeElementType = listSizeElementType(type);

      if(id <= this.sizeElementType.size){
        if(!initialList){
          this.container.remove(index);
        }

        component = await findElement(id, type);

        componentSelected = {
          id: id!,
          type: type,
          index: index!,
          dataList: []
        }

        this.listComponents$![index!].id = componentSelected.id;
      }
    }
    else if(!change){
      this.index++;
      component = await findElement(1, type);

      componentSelected = {
        id: 1,
        type: type,
        index: this.index,
        dataList: []
      } 
    }
    
    if(component != null){
      if(!change){
        if(initialList){
          this.addComponent(component, index);
        }
        else{
          this.addComponent(component);
          this._preferences.setListComponents(componentSelected!);
        }
      }else{
        this.addComponent(component, index);
      }
    }
  }

  addComponent(e: any, index?: number): void {
    let c: any = this.container.createComponent(e, {index: index})
    c.instance.editMode();
    if(index != undefined){
      c.instance.data(this.listComponents$[index].dataList)
      // this.container.insert(c.hostView, index)
    }
  }

  editComponent(index: number, type: string): void {
    let dataComponent = this.listComponents$.find((e) => e.index == index);
    
    this.dialog.open(ModalComponent,{
      width: '500px',
      data: {
        type: type,
        index: index,
        dataComponent: dataComponent
      }
    });
  }

  removeComponent(index: number, edit?: boolean): void {

    if(edit){
      this.container.remove(index);
    }
    else{
      this.index--;

      this.container.remove(index);

      let i = this.listComponents$?.findIndex((e) => e.index == index);

      this.listComponents$?.splice(i!,1);

      for(let e of this.listComponents$!){
        if(index < e.index){
          e.index = e.index-1
        }
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    this.listComponents$![event.previousIndex].index = event.currentIndex;
    this.listComponents$![event.currentIndex].index = event.previousIndex;

    moveItemInArray(this.listComponents$!, event.previousIndex, event.currentIndex);
    this.refreshView();
  }

  async refreshView(): Promise<void> {
    this.container.clear();

    let index = 0;
    for(let c of this.listComponents$!){
      let component = await findElement(c.id!, c.type);
      this.addComponent(component, index);

      index++;
    }
  }

  nextComponent(type: string, id: number, index: number): void{
    this.selectElement(type, true, id + 1, index);
  }

  previusComponent(type: string, id: number, index: number): void{
    this.selectElement(type, true, id - 1, index);
  }

  viewOrderComponents(): void{
    this.viewOrder = ! this.viewOrder
  }

  updateLayout(): void {
    this._preferences.updateLayout(this.listComponents$).subscribe({
      complete: () => {
        Swal.fire(
          'Save Components',
          'Layout successfully create!!',
          'success'
        )
      },
      error: () => {
        Swal.fire(
          'Error',
          'Layout Not Create',
          'error'
        )
      },
    });
  }

}
