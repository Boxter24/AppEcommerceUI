import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { findElement } from 'src/app/shared/utils/jsons/authComponent.json';
import { PreferencesService } from 'src/app/shared/services/preferences.service'
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(
    private preferenceService: PreferencesService,
    private _authService: AuthService,
  ) {
    _authService.clearStorage();
  }

  async ngAfterViewInit(): Promise<void> {
    this.container.clear();
    const element = await findElement(this.preferenceService.authComponent$)
    if(element != null){
      this.container.createComponent(element)
    }
  }

}
