import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentEcommerce } from 'src/app/shared/models/component.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { findElement } from 'src/app/shared/utils/jsons/ecommerceComponent.json';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements AfterViewInit {

  /*===== Variables =====*/
  listComponents$: ComponentEcommerce[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(
    private loader: LoaderService,
    private _preferences: PreferencesService,
    private _authService: AuthService,
  ) {
    loader.showLoader();

    _preferences.listComponents$.subscribe(
      e => {
        this.listComponents$ = e!;
      }
    );

    _authService.clearStorage();
  }

  async ngAfterViewInit(): Promise<void> {
    for (let c of this.listComponents$) {
      let element = await findElement(c.id!, c.type)
      this.addComponent(element, c.index);
    }

    setInterval(() => this.loader.hideLoader(),4000)
  }

  addComponent(e: any, i: number) {    
    let c: any = this.container.createComponent(e, {index: i})
    c.instance.data(this.listComponents$[i].dataList)
  }

}